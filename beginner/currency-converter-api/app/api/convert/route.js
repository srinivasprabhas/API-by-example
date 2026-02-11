// Currency Converter API Route
// Converts between currencies using ExchangeRate-API (v6)
// Endpoint: GET /api/convert?from=USD&to=EUR&amount=100

export async function GET(request) {
    try {
        const { searchParams} = new URL(request.url);
        const from = searchParams.get("from");
        const to = searchParams.get("to");
        const amount = searchParams.get("amount");

        //Validate required paramaeters
        if (!from || !to || !amount) {
            return Response.json(
                { error: "Missing required parameters: from, to, amount" },
                { status: 400}
            );
        }

        //Validate amount is positive number
        const numAmount = parseFloat(amount);
        if (numAmount <= 0) {
            return Response.json(
                { error: "Amount must be a positive number" },
                { status: 400 }
            );
        }

        // Check fro API key in env variables
        const API_KEY = process.env.EXCHANGERATE_API_KEY;
        if (!API_KEY) {
            return Response.json(
                { error: "Server configuration error" },
                { status: 500 }
            )
        }

        //Fetch Exchange rate from EXCHANGERATE - API v6 (pair endpoint with amount)
        const res = await fetch(
            `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${encodeURIComponent(from.toUpperCase())}/${encodeURIComponent(to.toUpperCase())}/${numAmount}` 
        );

        if (!res.ok) {
            return Response.json(
                { error: "Failed to fetch exchange rate data"},
                { status: res.status}
            );
        }

        const data = await res.json();

        //Handle API-Level errors
        if (data.result !== "success") {
            const errorMessage = {
                "unsupported-code": `Currency code "${from}" or "${to}" is not supported`,
                "malformed-request": "Invalid currency code format",
                "invalid-key": "Server configuration error",
                "inactive-account": "Server configuration error",
                "quota-reached": "API quota reached. Try again Later",
            };

            return Response.json(
                { error: errorMessage[data["error-type"]] || "Failed to fetch exchange rate" },
                { status: 400 }
            );
        }

        //Return Structured response
        return Response.json({
            from: data.base_code,
            to: data.target_code,
            rate: data.conversion_rate,
            amount: numAmount,
            result: data.conversion_result,
            last_updated: data.time_last_update_utc,
        });

    }  catch (error) {
        console.error("API error:", error);
        return Response.json(
            { error: "Internal server error"},
            { status: 500 }
        )
    }
}