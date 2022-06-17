const DecToBin=require('./十进制转二进制');

test('十进制转二进制', () => {
    expect(DecToBin(8)).toEqual('1000');
    expect(DecToBin(17)).toEqual('10001');
  });