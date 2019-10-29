// api请求地址
const base = '118.186.244.250';
// const base = '169.254.110.174';
// const base = '192.168.8.89';

const hostIp = process.env.NODE_ENV === 'development' ? base : base;
const httpPort = process.env.NODE_ENV === 'development' ? '18080' : '18080';// 8081 / 9001 / 59773
const wsPort = process.env.NODE_ENV === 'development' ? '18080' : '18080';

export const host = hostIp ? `http://${hostIp}:${httpPort}` : '';

export const ws = hostIp ? `http://${hostIp}:${wsPort}` : '';

