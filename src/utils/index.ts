const truncateString = (str: string, maxLength: number = 140): string => {
    if (!str || str.length <= 0) return '';
    if (maxLength <= 0) maxLength = 140;
    if (str.length <= maxLength) return str;
    return `${str.slice(0, maxLength)}...`;
  };
  
  export { truncateString };