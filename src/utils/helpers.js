export const gasToEth = (gas, gasPrice) => {
    return (gas * gasPrice * 0.000000000000000001).toFixed(7);
  };
  
  export const weiToEth = (amount) => {
    return (amount * 0.000000000000000001).toFixed(7);
  };
  
  export const smallerString = (
    _string,
    firstN = 5,
    lastN = -4,
    numOfDots = 4
  ) => {
    const _first = _string.slice(0, firstN);
    const _last = _string.slice(lastN);
  
    return `${_first}${Array(numOfDots).join(".")}${_last}`;
  };
  