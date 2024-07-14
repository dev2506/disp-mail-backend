import util from "util"
import crypto from "crypto"

export function createJWTToken(userId: string, secret: string) {
    const header = {
        alg: "HS256",
        typ: "JWT"
    }
    const encodedHeader = base64url(JSON.stringify(header))

    const timestampInSecs = Math.floor(Date.now() / 1000)
    const payload = {
        iat: timestampInSecs,
        exp: timestampInSecs + 6 * 60 * 60,
        userId: userId
    }
    const encodedPayload = base64url(JSON.stringify(payload))
    const input = util.format('%s.%s', encodedHeader, encodedPayload)
    const signature = createSignature(input, secret)
    return util.format('%s.%s', input, signature)
}

function createSignature(input: string, secret: string) {
    const hmac = crypto.createHmac('sha256', secret)
    hmac.update(input)
    const digest = hmac.digest('base64')
    return digest.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function base64url(payloadString: string) {
    return Buffer
        .from(payloadString)
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
}

export function verifyJwtToken(token: string, secret: string) {
    const jwtInput = token.split('.', 2).join('.')
    const jwtSig = token.split('.')[2]
    const signature = createSignature(jwtInput, secret)
    return bufferEqual(Buffer.from(jwtSig), Buffer.from(signature))
}

function bufferEqual(a: Buffer, b: Buffer) {
    if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
        return false
    }

    if (a.length !== b.length) {
        return false
    }

    let c = 0
    for (let i = 0; i < a.length; i++) {
        c |= a[i] ^ b[i]
    }
    return c === 0
}

export function decodeJwtToken(token: string) {
    const payload = token.split('.')[1]
    return JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'))
}