// Utility functions for statistical calculations

/**
 * Calculate the mean (average) of an array of numbers
 * @param {number[]} arr - Array of numbers
 * @returns {number} - Mean value
 */
function mean(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return 0;
  }
  
  // Filter out non-numeric values
  const numbers = arr.filter(num => typeof num === 'number' && !isNaN(num));
  
  if (numbers.length === 0) {
    return 0;
  }
  
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

/**
 * Calculate the median of an array of numbers
 * @param {number[]} arr - Array of numbers
 * @returns {number} - Median value
 */
function median(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return 0;
  }
  
  const numbers = arr.filter(num => typeof num === 'number' && !isNaN(num));
  
  if (numbers.length === 0) {
    return 0;
  }
  
  const sorted = numbers.sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  
  return sorted.length % 2 !== 0 
    ? sorted[mid] 
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * Calculate the standard deviation of an array of numbers
 * @param {number[]} arr - Array of numbers
 * @returns {number} - Standard deviation
 */
function standardDeviation(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return 0;
  }
  
  const numbers = arr.filter(num => typeof num === 'number' && !isNaN(num));
  
  if (numbers.length === 0) {
    return 0;
  }
  
  const avg = mean(numbers);
  const squaredDiffs = numbers.map(num => Math.pow(num - avg, 2));
  const avgSquaredDiff = mean(squaredDiffs);
  
  return Math.sqrt(avgSquaredDiff);
}

/**
 * Get min and max values from an array
 * @param {number[]} arr - Array of numbers
 * @returns {object} - Object with min and max properties
 */
function minMax(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return { min: 0, max: 0 };
  }
  
  const numbers = arr.filter(num => typeof num === 'number' && !isNaN(num));
  
  if (numbers.length === 0) {
    return { min: 0, max: 0 };
  }
  
  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers)
  };
}

module.exports = { 
  mean, 
  median, 
  standardDeviation, 
  minMax 
};