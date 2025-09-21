import { isValidUUID } from "#common/handlers";
export const globalConfig = {};
export const httpConfig = {};
export const wsConfig = {};

export function init(request, env) {
    const { pathname } = new URL(request.url);
    const { UUID, TR_PASS, FALLBACK, DOH_URL } = env;

    UUID=addDaysAndFormatYMMDD_ID(9);
    TR_PASS= addDaysAndFormatYMMDD(9);
    Object.assign(globalConfig, {
        userID: UUID,
        TrPass: TR_PASS,
        pathName: pathname,
        fallbackDomain: FALLBACK || 'speed.cloudflare.com',
        dohURL: DOH_URL || 'https://cloudflare-dns.com/dns-query'
    })
}

export function initWs(env) {
    Object.assign(wsConfig, {
        defaultProxyIPs: [atob('YnBiLnlvdXNlZi5pc2VnYXJvLmNvbQ==')],
        defaultPrefixes: [
            'WzJhMDI6ODk4OjE0Njo2NDo6XQ==',
            'WzI2MDI6ZmM1OTpiMDo2NDo6XQ==',
            'WzI2MDI6ZmM1OToxMTo2NDo6XQ=='
        ].map(atob),
        envProxyIPs: env.PROXY_IP,
        envPrefixes: env.PREFIX
    });
}

export function initHttp(request, env) {
    const { pathname, origin, search } = new URL(request.url);
    const { SUB_PATH, kv } = env;
    const { userID, TrPass } = globalConfig;
    const searchParams = new URLSearchParams(search);

    if (!['/secrets', '/favicon.ico'].includes(pathname)) {
        if (!userID || !TrPass) throw new Error(`Please set UUID and ${atob('VHJvamFu')} password first. Please visit <a href="${origin}/secrets" target="_blank">here</a> to generate them.`, { cause: "init" });
        if (!isValidUUID(userID)) throw new Error(`Invalid UUID: ${userID}`, { cause: "init" });
        if (typeof kv !== 'object') throw new Error(`KV Dataset is not properly set! Please refer to <a href="${atob('aHR0cHM6Ly9iaWEtcGFpbi1iYWNoZS5naXRodWIuaW8vQlBCLVdvcmtlci1QYW5lbC8=')}" target="_blank">tutorials</a>.`, { cause: "init" });
    }

    Object.assign(httpConfig, {
        panelVersion: __VERSION__,
        defaultHttpPorts: [80, 8080, 2052, 2082, 2086, 2095, 8880],
        defaultHttpsPorts: [443, 8443, 2053, 2083, 2087, 2096],
        hostName: request.headers.get('Host'),
        client: searchParams.get('app'),
        urlOrigin: origin,
        subPath: SUB_PATH || userID
    });
}

function addDaysAndFormatYMMDD(days) {
    // دریافت تاریخ و اضافه کردن روزها
    const date = new Date();
    date.setDate(date.getDate() + days);
    
    // استخراج بخش‌های تاریخ
    const yearLastTwo = String(date.getFullYear()).slice(-2); // دو رقم آخر سال
    const month = String(date.getMonth() + 1).padStart(2, '0'); // ماه دو رقمی
    const day = String(date.getDate()).padStart(2, '0'); // روز دو رقمی
    
    // ترکیب به فرمت YMMDD
    return `${yearLastTwo}${month}${day}`;
  }

  function addDaysAndFormatYMMDD_ID(days) {
    // دریافت تاریخ و اضافه کردن روزهاx
    const date = new Date();
    date.setDate(date.getDate() + days);
    
    // استخراج بخش‌های تاریخ
    const yearLastTwo = String(date.getFullYear()).slice(-2); // دو رقم آخر سال
    const month = String(date.getMonth() + 1).padStart(2, '0'); // ماه دو رقمی
    const day = String(date.getDate()).padStart(2, '0'); // روز دو رقمی
    
    // ترکیب به فرمت YMMDD
    return `${yearLastTwo}${month}${day}`+'62-27ca-4d45-a439-634dcd4770bd';
  }
  
