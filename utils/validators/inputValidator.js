function isValidDate(dateString) {
  const regexDate = /^\d{4}-\d{2}-\d{2}$/;
  return regexDate.test(dateString);
}

function validateDateInput(fromDate, toDate) {
  if (!isValidDate(fromDate) || !isValidDate(toDate)) {
    return {
      isValid: false,
      error: "Invalid date format. Please provide dates in YYYY-MM-DD format.",
    };
  }
  return { isValid: true };
}

module.exports = { validateDateInput };
