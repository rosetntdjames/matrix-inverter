import React, { useState, useEffect } from 'react';
import { AlertCircle, RotateCcw, Calculator, Play, Pause, SkipForward, SkipBack, CheckCircle, Sparkles, Copy, Check, Trash2 } from 'lucide-react';
import './App.css';

export default function MatrixInverter() {
  const [size, setSize] = useState(3);
  const [matrix, setMatrix] = useState(Array(3).fill(null).map(() => Array(3).fill('')));
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [highlightedRows, setHighlightedRows] = useState([]);
  const [fastMode, setFastMode] = useState(false);
  const [toast, setToast] = useState(null);
  const [copied, setCopied] = useState(false);
  const [determinant, setDeterminant] = useState(null);
  const [showAllSteps, setShowAllSteps] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('');

  // Helper functions
  const gcd = (a, b) => {
    a = Math.abs(Math.round(a));
    b = Math.abs(Math.round(b));
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const toFraction = (decimal) => {
    if (Math.abs(decimal) < 1e-10) return { numerator: 0, denominator: 1 };

    const sign = decimal < 0 ? -1 : 1;
    const absDecimal = Math.abs(decimal);

    const rounded = Math.round(absDecimal);
    if (Math.abs(absDecimal - rounded) < 1e-10) {
      return { numerator: sign * rounded, denominator: 1 };
    }

    const tolerance = 1e-9;
    let numerator = 1;
    let denominator = 0;
    let h2 = 0;
    let k2 = 1;
    let b = absDecimal;

    for (let i = 0; i < 50; i++) {
      const a = Math.floor(b);
      let aux = numerator;
      numerator = a * numerator + h2;
      h2 = aux;
      aux = denominator;
      denominator = a * denominator + k2;
      k2 = aux;

      if (denominator > 10000) break;
      if (Math.abs(absDecimal - numerator / denominator) < tolerance) break;
      if (Math.abs(b - a) < tolerance) break;

      b = 1 / (b - a);
    }

    return { numerator: sign * numerator, denominator };
  };

  const formatNumber = (num) => {
    if (Math.abs(num) < 1e-10) return '0';

    const rounded = Math.round(num);
    if (Math.abs(num - rounded) < 1e-10) return rounded.toString();

    const frac = toFraction(num);

    if (frac.denominator === 1) {
      return frac.numerator.toString();
    }

    const divisor = gcd(Math.abs(frac.numerator), frac.denominator);
    const simplifiedNum = frac.numerator / divisor;
    const simplifiedDen = frac.denominator / divisor;

    return simplifiedNum + '/' + simplifiedDen;
  };

  // Convert number to subscript Unicode characters
  const toSubscript = (num) => {
    const subscripts = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
    return num.toString().split('').map(digit => subscripts[parseInt(digit)]).join('');
  };

  // Parse fractional input (e.g., "1/2" -> 0.5)
  const parseFraction = (input) => {
    if (typeof input !== 'string') return input;
    const trimmed = input.trim();

    // Check if it's a fraction format
    const fractionMatch = trimmed.match(/^(-?\d+)\/(\d+)$/);
    if (fractionMatch) {
      const numerator = parseFloat(fractionMatch[1]);
      const denominator = parseFloat(fractionMatch[2]);
      if (denominator === 0) return NaN;
      return numerator / denominator;
    }

    // Otherwise parse as regular number
    return parseFloat(trimmed);
  };

  // Matrix Presets Library
  const matrixPresets = {
    '2x2': [
      {
        name: 'Simple 2×2',
        description: 'Easy invertible matrix',
        matrix: [['4', '7'], ['2', '6']]
      },
      {
        name: 'Identity 2×2',
        description: 'Identity matrix (A⁻¹ = A)',
        matrix: [['1', '0'], ['0', '1']]
      },
      {
        name: 'Diagonal 2×2',
        description: 'Diagonal matrix',
        matrix: [['3', '0'], ['0', '2']]
      },
      {
        name: 'Singular 2×2',
        description: 'Non-invertible matrix',
        matrix: [['2', '4'], ['1', '2']]
      }
    ],
    '3x3': [
      {
        name: 'Simple 3×3',
        description: 'Easy invertible matrix',
        matrix: [['2', '1', '0'], ['1', '3', '1'], ['0', '1', '2']]
      },
      {
        name: 'Identity 3×3',
        description: 'Identity matrix',
        matrix: [['1', '0', '0'], ['0', '1', '0'], ['0', '0', '1']]
      },
      {
        name: 'Symmetric 3×3',
        description: 'Symmetric matrix (A = Aᵀ)',
        matrix: [['4', '1', '2'], ['1', '3', '1'], ['2', '1', '5']]
      },
      {
        name: 'Diagonal 3×3',
        description: 'Diagonal matrix',
        matrix: [['2', '0', '0'], ['0', '5', '0'], ['0', '0', '3']]
      },
      {
        name: 'Upper Triangular',
        description: 'Upper triangular matrix',
        matrix: [['2', '3', '1'], ['0', '4', '2'], ['0', '0', '5']]
      },
      {
        name: 'Fractions 3×3',
        description: 'Matrix with fractions',
        matrix: [['1/2', '1/3', '0'], ['1/4', '1', '1/2'], ['0', '1/3', '2']]
      }
    ],
    '4x4': [
      {
        name: 'Simple 4×4',
        description: 'Easy invertible matrix',
        matrix: [['1', '2', '0', '1'], ['0', '1', '1', '0'], ['1', '0', '1', '2'], ['2', '1', '0', '1']]
      },
      {
        name: 'Identity 4×4',
        description: 'Identity matrix',
        matrix: [['1', '0', '0', '0'], ['0', '1', '0', '0'], ['0', '0', '1', '0'], ['0', '0', '0', '1']]
      },
      {
        name: 'Diagonal 4×4',
        description: 'Diagonal matrix',
        matrix: [['3', '0', '0', '0'], ['0', '2', '0', '0'], ['0', '0', '4', '0'], ['0', '0', '0', '5']]
      }
    ]
  };

  const handleSizeChange = (newSize) => {
    const n = parseInt(newSize);
    setSize(n);
    setMatrix(Array(n).fill(null).map(() => Array(n).fill('')));
    resetResults();
    setSelectedPreset(''); // Clear selected preset when size changes
  };

  const handleCellChange = (i, j, value) => {
    const newMatrix = matrix.map(row => [...row]);
    newMatrix[i][j] = value;
    setMatrix(newMatrix);
    setSelectedPreset(''); // Clear preset when manually editing
  };

  const resetResults = () => {
    setResult(null);
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
    setShowVerification(false);
    setHighlightedRows([]);
    setDeterminant(null);
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const clearAllCells = () => {
    setMatrix(Array(size).fill(null).map(() => Array(size).fill('')));
    resetResults();
    setSelectedPreset('');
    showToast('Matrix cleared', 'info');
  };

  const copyToClipboard = () => {
    if (!result || result.singular) return;

    const text = result.inverse.map(row =>
      row.map(cell => formatNumber(cell)).join('\t')
    ).join('\n');

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      showToast('Matrix copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      showToast('Failed to copy', 'error');
    });
  };

  const calculateDeterminant = (matrix, n) => {
    if (n === 1) return matrix[0][0];
    if (n === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }
    if (n === 3) {
      return (
        matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
        matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
        matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0])
      );
    }
    // For larger matrices, use expansion by minors
    let det = 0;
    for (let col = 0; col < n; col++) {
      const minor = matrix.slice(1).map(row =>
        row.filter((_, j) => j !== col)
      );
      const cofactor = matrix[0][col] * calculateDeterminant(minor, n - 1);
      det += (col % 2 === 0 ? 1 : -1) * cofactor;
    }
    return det;
  };

  const resetMatrix = () => {
    setSize(3);
    setMatrix(Array(3).fill(null).map(() => Array(3).fill('')));
    resetResults();
    setSelectedPreset('');
    showToast('Reset to default 3×3 matrix', 'info');
  };

  const loadPreset = (presetName) => {
    const sizeKey = `${size}x${size}`;
    const presets = matrixPresets[sizeKey] || [];
    const preset = presets.find(p => p.name === presetName);

    if (preset) {
      setMatrix(preset.matrix.map(row => [...row]));
      resetResults();
      setSelectedPreset(presetName);
      showToast(`Loaded: ${preset.name}`, 'success');
    }
  };

  const loadExample = () => {
    // Load first preset for current size
    const sizeKey = `${size}x${size}`;
    const presets = matrixPresets[sizeKey] || [];
    if (presets.length > 0) {
      loadPreset(presets[0].name);
    }
  };

  const invertMatrix = () => {
    const n = size;
    const newSteps = [];

    const A = matrix.map(row =>
      row.map(val => {
        const num = parseFraction(val);
        return isNaN(num) ? 0 : num;
      })
    );

    // Check for ill-conditioned matrix using determinant estimate
    const checkCondition = (matrix) => {
      if (n === 2) {
        return Math.abs(matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]);
      } else if (n === 3) {
        return Math.abs(
          matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
          matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
          matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0])
        );
      }
      return null;
    };

    const detEstimate = checkCondition(A);
    if (detEstimate !== null && detEstimate < 1e-10) {
      setResult({ singular: true, message: 'Matrix is singular! (determinant ≈ 0)' });
      setSteps(newSteps);
      setDeterminant(0);
      return;
    }

    // Calculate exact determinant for display
    const det = calculateDeterminant(A, n);
    setDeterminant(det);

    const augmented = A.map((row, i) => [
      ...row,
      ...Array(n).fill(0).map((_, j) => i === j ? 1 : 0)
    ]);

    const shouldRecordStep = (stepType) => {
      if (!fastMode) return true;
      return stepType === 'start' || stepType === 'final' || stepType === 'pivot';
    };

    if (shouldRecordStep('start')) {
      newSteps.push({
        description: 'Starting with augmented matrix [A | I]',
        matrix: augmented.map(row => [...row]),
        highlightedRows: []
      });
    }

    for (let col = 0; col < n; col++) {
      // FIXED: Find pivot starting from current row (col), not col+1
      let pivotRow = col;
      let maxVal = Math.abs(augmented[col][col]);

      for (let row = col; row < n; row++) {
        if (Math.abs(augmented[row][col]) > maxVal) {
          maxVal = Math.abs(augmented[row][col]);
          pivotRow = row;
        }
      }

      // Check for singular matrix with better tolerance
      if (maxVal < 1e-10) {
        setResult({
          singular: true,
          message: 'Matrix is singular or nearly singular (pivot too small)',
          column: col + 1
        });
        setSteps(newSteps);
        return;
      }

      // Swap rows if needed
      if (pivotRow !== col) {
        [augmented[col], augmented[pivotRow]] = [augmented[pivotRow], augmented[col]];
        if (shouldRecordStep('swap')) {
          newSteps.push({
            description: `[Type I] E${toSubscript(col + 1)}${toSubscript(pivotRow + 1)}: Swap row ${col + 1} ↔ row ${pivotRow + 1}`,
            matrix: augmented.map(row => [...row]),
            highlightedRows: [col, pivotRow]
          });
        }
      }

      // Scale pivot row
      const pivot = augmented[col][col];
      for (let j = 0; j < 2 * n; j++) {
        augmented[col][j] /= pivot;
      }
      if (shouldRecordStep('pivot')) {
        newSteps.push({
          description: `[Type II] E${toSubscript(col + 1)}(1/${formatNumber(pivot)}): Multiply row ${col + 1} by 1/${formatNumber(pivot)}`,
          matrix: augmented.map(row => [...row]),
          highlightedRows: [col]
        });
      }

      // Eliminate column
      for (let row = 0; row < n; row++) {
        if (row !== col) {
          const factor = augmented[row][col];
          if (Math.abs(factor) > 1e-10) {
            for (let j = 0; j < 2 * n; j++) {
              augmented[row][j] -= factor * augmented[col][j];
            }
            if (shouldRecordStep('eliminate')) {
              newSteps.push({
                description: `[Type III] E${toSubscript(row + 1)}${toSubscript(col + 1)}(${formatNumber(-factor)}): Replace R${toSubscript(row + 1)} with R${toSubscript(row + 1)} + (${formatNumber(-factor)}) × R${toSubscript(col + 1)}`,
                matrix: augmented.map(row => [...row]),
                highlightedRows: [row, col]
              });
            }
          }
        }
      }
    }

    // Final check: verify we got identity on left side
    let isIdentity = true;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const expected = i === j ? 1 : 0;
        if (Math.abs(augmented[i][j] - expected) > 1e-8) {
          isIdentity = false;
          break;
        }
      }
      if (!isIdentity) break;
    }

    if (!isIdentity) {
      setResult({
        singular: true,
        message: 'Matrix is ill-conditioned (unable to form identity matrix)'
      });
      setSteps(newSteps);
      return;
    }

    const inverse = augmented.map(row => row.slice(n));

    // Add final step showing the complete augmented matrix [I | A⁻¹]
    if (shouldRecordStep('final')) {
      newSteps.push({
        description: 'Final Result: Successfully transformed [A | I] into [I | A⁻¹]',
        matrix: augmented.map(row => [...row]),
        highlightedRows: [],
        isFinalResult: true
      });
    }

    // Check condition number estimate
    const checkInverseQuality = () => {
      let maxInvElement = 0;
      let maxOrigElement = 0;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          maxInvElement = Math.max(maxInvElement, Math.abs(inverse[i][j]));
          maxOrigElement = Math.max(maxOrigElement, Math.abs(A[i][j]));
        }
      }
      return maxInvElement * maxOrigElement;
    };

    const conditionEstimate = checkInverseQuality();
    const poorlyConditioned = conditionEstimate > 1000;

    setResult({
      inverse,
      originalMatrix: A,
      poorlyConditioned,
      conditionEstimate
    });
    setSteps(newSteps);
  };

  const verifyInverse = () => {
    if (!result || result.singular) return null;

    const n = size;
    const A = result.originalMatrix;
    const Ainv = result.inverse;
    const product = Array(n).fill(null).map(() => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        for (let k = 0; k < n; k++) {
          product[i][j] += A[i][k] * Ainv[k][j];
        }
      }
    }

    return product;
  };


  // Animation playback
  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        if (steps[currentStep + 1]) {
          setHighlightedRows(steps[currentStep + 1].highlightedRows || []);
        }
      }, 1500);
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, steps]);

  const displayedStep = steps[currentStep];

  return (
    <div className="matrix-inverter-container">
      <div className="matrix-inverter-card">
        <div className="header">
          <div className="header-icon">
            <img src="/xirtam.png" alt="Xirtam Logo" className="icon" />
          </div>
          <div className="header-text">
            <h1>Xirtam</h1>
            <p>Invert matrices using the Gauss-Jordan Elimination Algorithm!</p>
          </div>
        </div>

        <div className="quick-select-section">
          <div className="quick-select-header">
            <label>Matrix Setup</label>
          </div>

          <div className="quick-select-content">
            {/* Size Selection */}
            <div className="select-group">
              <span className="select-group-label">Size:</span>
              <div className="size-button-group">
                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                  <button
                    key={n}
                    onClick={() => handleSizeChange(n)}
                    className={`btn-size ${size === n ? 'active' : ''}`}
                  >
                    {n}×{n}
                  </button>
                ))}
              </div>
            </div>

            {/* Preset Matrices */}
            <div className="select-group">
              <span className="select-group-label">Presets:</span>
              <div className="preset-button-group">
                {(matrixPresets[`${size}x${size}`] || []).map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => loadPreset(preset.name)}
                    className={`btn-preset ${selectedPreset === preset.name ? 'active' : ''}`}
                    title={preset.description}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {size >= 5 && (
          <div className="fast-mode-toggle">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={fastMode}
                onChange={(e) => setFastMode(e.target.checked)}
                className="toggle-checkbox"
              />
              <span className="toggle-text">
                Fast Mode (show only key steps for {size}×{size} matrix)
              </span>
            </label>
          </div>
        )}

        <div className="input-section">
          <label>Input Matrix (A)</label>
          <div className="matrix-container">
            {matrix.map((row, i) => (
              <div key={i} className="matrix-row">
                {row.map((cell, j) => (
                  <input
                    key={j}
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    value={cell}
                    onChange={(e) => handleCellChange(i, j, e.target.value)}
                    className="matrix-input"
                    placeholder="0"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={invertMatrix} className="btn-primary">
            Calculate Inverse
          </button>
          <button onClick={resetMatrix} className="btn-secondary" title="Reset Matrix">
            <RotateCcw className="icon-small" />
            Reset
          </button>
        </div>

        {result && (
          <div className="result-section fade-in">
            {result.singular ? (
              <div className="alert alert-error">
                <div className="alert-content">
                  <AlertCircle className="alert-icon" />
                  <div>
                    <h3>Matrix Cannot Be Inverted</h3>
                    <p style={{ marginBottom: 'var(--spacing-3)' }}>
                      {result.message || 'This matrix is singular (determinant is zero).'}
                    </p>

                    <div style={{
                      background: 'rgba(0, 0, 0, 0.1)',
                      padding: 'var(--spacing-4)',
                      borderRadius: 'var(--radius-md)',
                      marginTop: 'var(--spacing-3)'
                    }}>
                      <strong style={{ display: 'block', marginBottom: 'var(--spacing-2)' }}>
                        Why can't this matrix be inverted?
                      </strong>

                      <p style={{ margin: 'var(--spacing-2) 0' }}>
                        A matrix is <strong>singular</strong> (non-invertible) when its determinant equals zero.
                        This happens when:
                      </p>

                      <ul style={{
                        marginLeft: 'var(--spacing-6)',
                        marginTop: 'var(--spacing-2)',
                        lineHeight: '1.6'
                      }}>
                        <li><strong>Linear Dependence:</strong> One or more rows (or columns) can be expressed
                          as a linear combination of other rows</li>
                        <li><strong>Zero Row/Column:</strong> The matrix contains a row or column of all zeros</li>
                        <li><strong>Proportional Rows:</strong> Two or more rows are scalar multiples of each other</li>
                      </ul>

                      {result.column && (
                        <p style={{
                          marginTop: 'var(--spacing-3)',
                          padding: 'var(--spacing-2)',
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: 'var(--radius-sm)',
                          fontWeight: 600
                        }}>
                          ⚠️ Problem detected at column {result.column}: The pivot element was too small,
                          indicating linear dependence in the columns.
                        </p>
                      )}

                      <p style={{ marginTop: 'var(--spacing-3)', fontStyle: 'italic' }}>
                        <strong>Mathematical implication:</strong> The system Ax = b either has no solution
                        or infinitely many solutions, depending on b. The transformation collapses the space
                        into a lower dimension.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="result-content">
                {result.poorlyConditioned && (
                  <div className="alert alert-warning">
                    <div className="alert-content">
                      <AlertCircle className="alert-icon" />
                      <div>
                        <h3>Warning: Ill-Conditioned Matrix</h3>
                        <p>This matrix is poorly conditioned (condition number ≈ {result.conditionEstimate.toFixed(0)}). The inverse may be numerically unstable and sensitive to small changes in input values.</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="alert alert-success">
                  <div className="alert-header">
                    <div className="result-title-group">
                      <h3>
                        <CheckCircle className="success-icon" />
                        Inverse Matrix (A⁻¹)
                      </h3>
                      {determinant !== null && (
                        <div className="determinant-badge">
                          det(A) = {formatNumber(determinant)}
                        </div>
                      )}
                    </div>
                    <div className="result-actions">
                      <button onClick={copyToClipboard} className="btn-copy" title="Copy to Clipboard">
                        {copied ? <Check className="icon-small" /> : <Copy className="icon-small" />}
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                      <button onClick={() => setShowVerification(!showVerification)} className="btn-verify">
                        {showVerification ? 'Hide' : 'Verify'} Result
                      </button>
                    </div>
                  </div>
                  <div className="matrix-result">
                    {result.inverse.map((row, i) => (
                      <div key={i} className="matrix-row">
                        {row.map((cell, j) => (
                          <div key={j} className="result-cell">
                            {formatNumber(cell)}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {showVerification && (
                  <div className="alert alert-info fade-in">
                    <h3>Verification: A × A⁻¹ = I</h3>
                    <p style={{ marginBottom: 'var(--spacing-4)', color: 'inherit' }}>
                      To verify the inverse is correct, we multiply the original matrix A by its inverse A⁻¹.
                      The result should be the identity matrix I.
                    </p>

                    <div style={{ marginBottom: 'var(--spacing-4)' }}>
                      <strong>Matrix Multiplication Formula:</strong>
                      <p style={{ margin: 'var(--spacing-2) 0', fontFamily: 'SF Mono, Monaco, monospace', fontSize: '0.875rem', color: 'inherit' }}>
                        (A × A⁻¹)[i,j] = Σ(k=1 to n) A[i,k] × A⁻¹[k,j]
                      </p>
                    </div>

                    <div style={{ marginBottom: 'var(--spacing-4)' }}>
                      <strong>Example calculation for first element (row 1, col 1):</strong>
                      <p style={{ margin: 'var(--spacing-2) 0', fontFamily: 'SF Mono, Monaco, monospace', fontSize: '0.875rem', color: 'inherit' }}>
                        {(() => {
                          if (!result || result.singular) return '';
                          const A = result.originalMatrix;
                          const Ainv = result.inverse;
                          const terms = [];
                          for (let k = 0; k < size; k++) {
                            terms.push(`(${formatNumber(A[0][k])} × ${formatNumber(Ainv[k][0])})`);
                          }
                          const sum = terms.reduce((acc, term, k) =>
                            acc + A[0][k] * Ainv[k][0], 0
                          );
                          return `${terms.join(' + ')} = ${formatNumber(sum)}`;
                        })()}
                      </p>
                    </div>

                    <strong>Result Matrix (A × A⁻¹):</strong>
                    <div className="verification-result">
                      {verifyInverse()?.map((row, i) => (
                        <div key={i} className="matrix-row">
                          {row.map((cell, j) => (
                            <div
                              key={j}
                              className={`verify-cell ${Math.abs(cell - (i === j ? 1 : 0)) < 0.01 ? 'verify-correct' : 'verify-incorrect'
                                }`}
                              title={`c${toSubscript(i + 1)}${toSubscript(j + 1)} = ${(() => {
                                if (!result || result.singular) return '';
                                const A = result.originalMatrix;
                                const Ainv = result.inverse;
                                const terms = [];
                                for (let k = 0; k < size; k++) {
                                  terms.push(`a${toSubscript(i + 1)}${toSubscript(k + 1)}×b${toSubscript(k + 1)}${toSubscript(j + 1)}`);
                                }
                                const calculation = terms.join(' + ') + ' = ' + terms.map((term, k) =>
                                  `${formatNumber(A[i][k])}×${formatNumber(Ainv[k][j])}`
                                ).join(' + ');
                                return calculation;
                              })()}`}
                            >
                              {formatNumber(cell)}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>

                    <p style={{ marginTop: 'var(--spacing-4)', fontSize: '0.875rem', color: 'inherit' }}>
                      <strong>✓ Hover over any cell</strong> to see its detailed calculation.
                      {verifyInverse()?.every((row, i) =>
                        row.every((cell, j) => Math.abs(cell - (i === j ? 1 : 0)) < 0.01)
                      ) ? (
                        <span style={{ display: 'block', marginTop: 'var(--spacing-2)', color: 'var(--color-success)' }}>
                          ✓ All elements are correct! The inverse is verified.
                        </span>
                      ) : (
                        <span style={{ display: 'block', marginTop: 'var(--spacing-2)', color: 'var(--color-error)' }}>
                          ⚠ Some elements differ from the identity matrix. This may indicate numerical error.
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {steps.length > 0 && (
          <div className="steps-section">
            <div className="steps-header">
              <h3>Step-by-Step Solution</h3>
              <button
                onClick={() => setShowAllSteps(!showAllSteps)}
                className="btn-toggle-steps"
              >
                {showAllSteps ? 'Show Animation' : 'Show All Steps'}
              </button>
            </div>

            {!showAllSteps && (
              <>
                <div className="playback-controls">
                  <button onClick={() => setCurrentStep(0)} disabled={currentStep === 0} className="btn-control">
                    <SkipBack className="icon-small" />
                  </button>
                  <button onClick={() => setIsPlaying(!isPlaying)} className="btn-play">
                    {isPlaying ? <Pause className="icon-small" /> : <Play className="icon-small" />}
                  </button>
                  <button onClick={() => setCurrentStep(steps.length - 1)} disabled={currentStep === steps.length - 1} className="btn-control">
                    <SkipForward className="icon-small" />
                  </button>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
                  </div>
                  <span className="step-counter">{currentStep + 1} / {steps.length}</span>
                </div>
              </>
            )}

            {!showAllSteps && displayedStep && (
              <div className="step-display">
                <p className="step-description">{displayedStep.description}</p>
                <div className="step-matrix">
                  {displayedStep.matrix.map((row, i) => (
                    <div key={i} className="matrix-row">
                      {row.map((cell, j) => (
                        <div
                          key={j}
                          className={`step-cell ${j === size - 1 ? 'divider' : ''} ${highlightedRows.includes(i) ? 'highlighted' : ''
                            }`}
                        >
                          {formatNumber(cell)}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showAllSteps && (
              <div className="all-steps-container">
                {steps.map((step, idx) => (
                  <div key={idx} className="all-steps-item">
                    <div className="step-number">Step {idx + 1}</div>
                    <p className="step-description">{step.description}</p>
                    <div className="step-matrix-compact">
                      {step.matrix.map((row, i) => (
                        <div key={i} className="matrix-row">
                          {row.map((cell, j) => (
                            <div
                              key={j}
                              className={`step-cell-compact ${j === size - 1 ? 'divider' : ''}`}
                            >
                              {formatNumber(cell)}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Toast Notification */}
        {toast && (
          <div className={`toast toast-${toast.type}`}>
            <div className="toast-content">
              {toast.type === 'success' && <CheckCircle className="toast-icon" />}
              {toast.type === 'error' && <AlertCircle className="toast-icon" />}
              {toast.type === 'info' && <AlertCircle className="toast-icon" />}
              <span>{toast.message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}