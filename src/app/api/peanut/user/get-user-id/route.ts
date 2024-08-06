import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const { accountIdentifier } = await request.json()
    const apiKey = process.env.PEANUT_API_KEY

    if (!accountIdentifier || !apiKey) {
        return new NextResponse('Bad Request: missing required parameters', { status: 400 })
    }

    try {
        const response = await fetch('https://api.peanut.to/get-user-id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ accountIdentifier }),
        })

        if (response.status !== 200) {
            return new NextResponse('Error in get-user-id', {
                status: response.status,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        }

        const data = await response.json()
        return new NextResponse(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    } catch (error) {
        console.error('Error:', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}