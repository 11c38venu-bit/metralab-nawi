// METRALAB - Reusable Calculation & Compliance Engine
// Observation Data -> Calculation Engine -> Rule Configuration -> Acceptance Engine -> Evaluation Result

/**
 * Basic Arithmetic Helpers
 */
export const calculateError = (ind, ref) => {
  const valInd = parseFloat(ind);
  const valRef = parseFloat(ref);
  if (isNaN(valInd) || isNaN(valRef)) return null;
  return parseFloat((valInd - valRef).toFixed(3));
};

export const calculateNet = (gross, tare) => {
  const valGross = parseFloat(gross);
  const valTare = parseFloat(tare);
  if (isNaN(valGross) || isNaN(valTare)) return null;
  return parseFloat((valGross - valTare).toFixed(3));
};

export const calculateChange = (start, end) => {
  const valStart = parseFloat(start);
  const valEnd = parseFloat(end);
  if (isNaN(valStart) || isNaN(valEnd)) return null;
  return parseFloat((valEnd - valStart).toFixed(3));
};

/**
 * Format signed float with unit
 */
export const formatSignedVal = (val, unit = 'kg') => {
  if (val === null || val === undefined || isNaN(val)) return '—';
  const num = parseFloat(val);
  const formatted = Math.abs(num).toFixed(1);
  if (num > 0) return `+${formatted} ${unit}`;
  if (num < 0) return `-${formatted} ${unit}`;
  return `0.0 ${unit}`;
};

/**
 * Evaluate single acceptance criterion
 */
export const evaluateCriterion = (calculatedValue, rule) => {
  if (!rule) {
    return {
      result: 'REVIEW',
      explanation: 'A compliance determination cannot be made because the applicable criterion is not configured.'
    };
  }

  if (rule.criterionType === 'not_configured' || !rule.maxAllowableLimit) {
    return {
      result: 'REVIEW',
      explanation: 'A compliance determination cannot be made because the applicable criterion is not configured.'
    };
  }

  if (calculatedValue === null || calculatedValue === undefined || isNaN(calculatedValue)) {
    return {
      result: 'NOT EVALUATED',
      explanation: 'Required observation values are incomplete or invalid.'
    };
  }

  const absVal = Math.abs(calculatedValue);
  const limit = rule.maxAllowableLimit;

  if (absVal <= limit) {
    return {
      result: 'PASS',
      explanation: `Calculated result (${absVal.toFixed(1)} ${rule.unit}) is within the configured acceptance criterion (≤ ${limit} ${rule.unit}).`
    };
  } else {
    return {
      result: 'FAIL',
      explanation: `Calculated result (${absVal.toFixed(1)} ${rule.unit}) exceeds the configured acceptance criterion (≤ ${limit} ${rule.unit}).`
    };
  }
};

/**
 * Dynamic Test Evaluation Dispatcher
 */
export const evaluateTestCalculations = (testId, rows = [], instrumentData = {}, rule = {}) => {
  const resultObj = {
    testId,
    testType: rule.testType || 'Unknown Test',
    ruleId: rule.ruleId || 'N/A',
    ruleVersion: rule.ruleVersion || 'Prototype Rule Set — 2026.1',
    criterion: rule.criterion || 'Criterion not configured',
    criterionType: rule.criterionType || 'not_configured',
    unit: rule.unit || 'kg',
    calculatedMetrics: {},
    formulaTraceability: [],
    validationMessages: [],
    result: 'NOT EVALUATED',
    explanation: ''
  };

  if (!rows || rows.length === 0) {
    resultObj.validationMessages.push('No observation rows recorded.');
    resultObj.explanation = 'Observations are required before evaluating calculations.';
    return resultObj;
  }

  // Evaluate based on test template
  switch (testId) {
    case 'T1': {
      // Weighing Performance
      let maxAbsErr = -1;
      let maxErrRow = null;
      const validErrors = [];

      rows.forEach((r, idx) => {
        const err = calculateError(r.indication, r.reference);
        if (err === null) {
          resultObj.validationMessages.push(`Row ${idx + 1}: Indication and Reference Value are required.`);
        } else {
          validErrors.push(err);
          if (Math.abs(err) > maxAbsErr) {
            maxAbsErr = Math.abs(err);
            maxErrRow = { ...r, err, rowNum: idx + 1 };
          }
        }
      });

      if (validErrors.length < rows.length) {
        resultObj.result = 'NOT EVALUATED';
        resultObj.explanation = `${resultObj.validationMessages.length} required observations are incomplete.`;
        return resultObj;
      }

      resultObj.calculatedMetrics = {
        loadPointsCount: validErrors.length,
        maximumAbsoluteError: maxAbsErr,
        maxErrorLoadPoint: maxErrRow ? `${maxErrRow.load} kg` : '—',
        keyResultText: `Maximum Absolute Error: ${formatSignedVal(maxAbsErr, 'kg')}`
      };

      resultObj.formulaTraceability = [
        {
          label: 'Error Formula',
          input: `Indication = ${maxErrRow?.indication || 0} kg, Reference = ${maxErrRow?.reference || 0} kg`,
          formula: 'Error = Indication - Reference Value',
          calculation: `${maxErrRow?.indication || 0} - ${maxErrRow?.reference || 0}`,
          result: formatSignedVal(maxErrRow?.err || 0, 'kg')
        },
        {
          label: 'Maximum Absolute Error',
          input: `Errors = [${validErrors.map((e) => formatSignedVal(e, 'kg')).join(', ')}]`,
          formula: 'Max Error = max(abs(Error_1), ..., abs(Error_N))',
          calculation: `max(${validErrors.map((e) => Math.abs(e)).join(', ')})`,
          result: `${maxAbsErr.toFixed(1)} kg`
        }
      ];

      const evalRes = evaluateCriterion(maxAbsErr, rule);
      resultObj.result = evalRes.result;
      resultObj.explanation = evalRes.explanation;
      break;
    }

    case 'T2': {
      // Repeatability
      const validErrors = [];
      let maxErr = -Infinity;
      let minErr = Infinity;

      rows.forEach((r, idx) => {
        const err = calculateError(r.indication, r.reference);
        if (err === null) {
          resultObj.validationMessages.push(`Observation ${idx + 1}: Indication and Reference Value are required.`);
        } else {
          validErrors.push(err);
          if (err > maxErr) maxErr = err;
          if (err < minErr) minErr = err;
        }
      });

      if (validErrors.length < rows.length) {
        resultObj.result = 'NOT EVALUATED';
        resultObj.explanation = `${resultObj.validationMessages.length} required observations are incomplete.`;
        return resultObj;
      }

      const errorRange = parseFloat((maxErr - minErr).toFixed(3));

      resultObj.calculatedMetrics = {
        observationsCount: validErrors.length,
        maximumError: maxErr,
        minimumError: minErr,
        errorRange: errorRange,
        keyResultText: `Error Range: ${errorRange.toFixed(1)} kg`
      };

      resultObj.formulaTraceability = [
        {
          label: 'Maximum & Minimum Error',
          input: `Errors = [${validErrors.map((e) => formatSignedVal(e, 'kg')).join(', ')}]`,
          formula: 'Max = max(Errors), Min = min(Errors)',
          calculation: `Max = ${maxErr.toFixed(1)}, Min = ${minErr.toFixed(1)}`,
          result: `Max: ${formatSignedVal(maxErr, 'kg')}, Min: ${formatSignedVal(minErr, 'kg')}`
        },
        {
          label: 'Error Range',
          input: `Max Error = ${formatSignedVal(maxErr, 'kg')}, Min Error = ${formatSignedVal(minErr, 'kg')}`,
          formula: 'Error Range = Maximum Error - Minimum Error',
          calculation: `${maxErr.toFixed(1)} - (${minErr.toFixed(1)})`,
          result: `${errorRange.toFixed(1)} kg`
        }
      ];

      const evalRes = evaluateCriterion(errorRange, rule);
      resultObj.result = evalRes.result;
      resultObj.explanation = evalRes.explanation;
      break;
    }

    case 'T3': {
      // Eccentricity
      let maxDev = -1;
      let maxPosRow = null;
      const validErrors = [];

      rows.forEach((r, idx) => {
        const err = calculateError(r.indication, r.reference);
        if (err === null) {
          resultObj.validationMessages.push(`Position ${r.position}: Indication is required.`);
        } else {
          validErrors.push(err);
          if (Math.abs(err) > maxDev) {
            maxDev = Math.abs(err);
            maxPosRow = { ...r, err };
          }
        }
      });

      if (validErrors.length < rows.length) {
        resultObj.result = 'NOT EVALUATED';
        resultObj.explanation = `${resultObj.validationMessages.length} required observations are incomplete.`;
        return resultObj;
      }

      resultObj.calculatedMetrics = {
        positionsTested: validErrors.length,
        maximumAbsoluteDeviation: maxDev,
        positionOfMaxDeviation: maxPosRow ? maxPosRow.position : '—',
        keyResultText: `Maximum Deviation: ${formatSignedVal(maxDev, 'kg')} at ${maxPosRow?.position || 'Center'}`
      };

      resultObj.formulaTraceability = [
        {
          label: 'Corner Off-Center Deviation',
          input: `Positions = [Center, Front Left, Front Right, Rear Left, Rear Right]`,
          formula: 'Deviation = abs(Indication - Reference)',
          calculation: `max(${validErrors.map((e) => Math.abs(e)).join(', ')})`,
          result: `${maxDev.toFixed(1)} kg (${maxPosRow?.position || 'Center'})`
        }
      ];

      const evalRes = evaluateCriterion(maxDev, rule);
      resultObj.result = evalRes.result;
      resultObj.explanation = evalRes.explanation;
      break;
    }

    case 'T4': {
      // Zero Setting
      let maxZeroDev = 0;
      const validDevs = [];

      rows.forEach((r, idx) => {
        const zeroVal = parseFloat(r.zeroIndication);
        if (isNaN(zeroVal)) {
          resultObj.validationMessages.push(`Observation ${idx + 1}: Zero Indication is required.`);
        } else {
          validDevs.push(Math.abs(zeroVal));
          if (Math.abs(zeroVal) > maxZeroDev) {
            maxZeroDev = Math.abs(zeroVal);
          }
        }
      });

      if (validDevs.length < rows.length) {
        resultObj.result = 'NOT EVALUATED';
        resultObj.explanation = `${resultObj.validationMessages.length} required zero observations are incomplete.`;
        return resultObj;
      }

      resultObj.calculatedMetrics = {
        zeroRunsCount: validDevs.length,
        maximumZeroChange: maxZeroDev,
        keyResultText: `Max Zero Deviation: ${maxZeroDev.toFixed(1)} kg`
      };

      resultObj.formulaTraceability = [
        {
          label: 'Zero Indication Deviation',
          input: `Zero Indications = [${rows.map((r) => r.zeroIndication).join(', ')}]`,
          formula: 'Max Zero Deviation = max(abs(Zero Indication))',
          calculation: `max(${validDevs.join(', ')})`,
          result: `${maxZeroDev.toFixed(1)} kg`
        }
      ];

      const evalRes = evaluateCriterion(maxZeroDev, rule);
      resultObj.result = evalRes.result;
      resultObj.explanation = evalRes.explanation;
      break;
    }

    case 'T5': {
      // Tare
      let maxNetErr = -1;
      const validNetErrs = [];

      rows.forEach((r, idx) => {
        const net = calculateNet(r.grossLoad, r.tareValue);
        const ref = parseFloat(r.reference);

        if (net === null || isNaN(ref)) {
          resultObj.validationMessages.push(`Observation ${idx + 1}: Gross Load, Tare Value, and Reference Value are required.`);
        } else {
          const err = net - ref;
          validNetErrs.push(Math.abs(err));
          if (Math.abs(err) > maxNetErr) {
            maxNetErr = Math.abs(err);
          }
        }
      });

      if (validNetErrs.length < rows.length) {
        resultObj.result = 'NOT EVALUATED';
        resultObj.explanation = `${resultObj.validationMessages.length} required tare observations are incomplete.`;
        return resultObj;
      }

      resultObj.calculatedMetrics = {
        observationsCount: validNetErrs.length,
        maximumNetError: maxNetErr,
        keyResultText: `Max Net Error: ${formatSignedVal(maxNetErr, 'kg')}`
      };

      resultObj.formulaTraceability = [
        {
          label: 'Net Indication Formula',
          input: `Gross Load = ${rows[0]?.grossLoad || 0} kg, Tare Value = ${rows[0]?.tareValue || 0} kg`,
          formula: 'Net Indication = Gross Load - Tare Value',
          calculation: `${rows[0]?.grossLoad || 0} - ${rows[0]?.tareValue || 0}`,
          result: `${calculateNet(rows[0]?.grossLoad, rows[0]?.tareValue) || 0} kg`
        },
        {
          label: 'Net Error',
          input: `Net Indication = ${calculateNet(rows[0]?.grossLoad, rows[0]?.tareValue) || 0} kg, Reference = ${rows[0]?.reference || 0} kg`,
          formula: 'Net Error = Net Indication - Reference Value',
          calculation: `${calculateNet(rows[0]?.grossLoad, rows[0]?.tareValue) || 0} - ${rows[0]?.reference || 0}`,
          result: `${maxNetErr.toFixed(1)} kg`
        }
      ];

      const evalRes = evaluateCriterion(maxNetErr, rule);
      resultObj.result = evalRes.result;
      resultObj.explanation = evalRes.explanation;
      break;
    }

    case 'T6': {
      // Creep
      const row = rows[0] || {};
      const change = calculateChange(row.startIndication, row.endIndication);

      if (change === null) {
        resultObj.validationMessages.push('Start Indication and End Indication are required.');
        resultObj.result = 'NOT EVALUATED';
        resultObj.explanation = 'Creep indications are incomplete.';
        return resultObj;
      }

      resultObj.calculatedMetrics = {
        testLoad: `${row.load || 500} kg`,
        startIndication: `${row.startIndication} kg`,
        endIndication: `${row.endIndication} kg`,
        elapsedTime: `${row.elapsedTime || 30} min`,
        observedChange: change,
        keyResultText: `Creep Change: ${formatSignedVal(change, 'kg')} over ${row.elapsedTime || 30} min`
      };

      resultObj.formulaTraceability = [
        {
          label: 'Sustained Load Creep Change',
          input: `Start = ${row.startIndication} kg, End = ${row.endIndication} kg`,
          formula: 'Change = End Indication - Start Indication',
          calculation: `${row.endIndication} - ${row.startIndication}`,
          result: formatSignedVal(change, 'kg')
        }
      ];

      const evalRes = evaluateCriterion(change, rule);
      resultObj.result = evalRes.result;
      resultObj.explanation = evalRes.explanation;
      break;
    }

    case 'T7': {
      // Warm-up / Stabilization
      const firstRow = rows[0] || {};
      const lastRow = rows[rows.length - 1] || {};
      const indChange = calculateChange(firstRow.indication, lastRow.indication);
      const tempChange = calculateChange(firstRow.temperature, lastRow.temperature);

      if (indChange === null) {
        resultObj.validationMessages.push('Initial and final warm-up indications are required.');
        resultObj.result = 'NOT EVALUATED';
        resultObj.explanation = 'Warm-up indications are incomplete.';
        return resultObj;
      }

      resultObj.calculatedMetrics = {
        timeIntervalsCount: rows.length,
        initialIndication: `${firstRow.indication} kg`,
        finalIndication: `${lastRow.indication} kg`,
        totalIndicationChange: indChange,
        temperatureChange: tempChange,
        keyResultText: `Warm-up Drift: ${formatSignedVal(indChange, 'kg')}`
      };

      resultObj.formulaTraceability = [
        {
          label: 'Warm-up Thermal Drift',
          input: `Initial = ${firstRow.indication} kg, 60-min Final = ${lastRow.indication} kg`,
          formula: 'Indication Change = Final Indication - Initial Indication',
          calculation: `${lastRow.indication} - ${firstRow.indication}`,
          result: formatSignedVal(indChange, 'kg')
        }
      ];

      const evalRes = evaluateCriterion(indChange, rule);
      resultObj.result = evalRes.result;
      resultObj.explanation = evalRes.explanation;
      break;
    }

    default:
      resultObj.result = 'NOT EVALUATED';
      resultObj.explanation = 'Unknown test template.';
  }

  return resultObj;
};

/**
 * Overall Evaluation Status Evaluator across all 7 tests
 */
export const evaluateOverallStatus = (testsList = [], evalResultsMap = {}) => {
  let completedCount = 0;
  let passedCount = 0;
  let failedCount = 0;
  let reviewCount = 0;
  let notEvaluatedCount = 0;

  testsList.forEach((t) => {
    const res = evalResultsMap[t.id];
    if (t.status === 'Completed' || (res && res.result !== 'NOT EVALUATED')) {
      completedCount++;
    }

    if (!res) {
      notEvaluatedCount++;
      return;
    }

    if (res.result === 'PASS') {
      passedCount++;
    } else if (res.result === 'FAIL') {
      failedCount++;
    } else if (res.result === 'REVIEW') {
      reviewCount++;
    } else {
      notEvaluatedCount++;
    }
  });

  let overallStatus = 'Testing In Progress';

  if (completedCount < testsList.length) {
    overallStatus = 'Testing In Progress';
  } else if (failedCount > 0) {
    overallStatus = 'Evaluation Completed — FAIL';
  } else if (reviewCount > 0) {
    overallStatus = 'Evaluation Requires Review';
  } else if (passedCount === testsList.length) {
    overallStatus = 'Evaluation Completed — PASS';
  } else {
    overallStatus = 'Evaluation Pending';
  }

  return {
    totalTests: testsList.length,
    completedCount,
    passedCount,
    failedCount,
    reviewCount,
    notEvaluatedCount,
    overallStatus
  };
};
