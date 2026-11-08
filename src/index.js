
const videos = [
    "dQw4w9WgXcQ",
    "9bZkp7q19f0",
    "kJQP7kiw5Fk",
    "3JZ_D3ELwOQ"
];

export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        if (url.pathname === "/api/random-video") {
            if (request.method !== "GET") {
                return new Response("Method Not Allowed", {
                    status: 405
                });
            }

            const id = videos[
                Math.floor(Math.random() * videos.length)
            ];

            return new Response(
                JSON.stringify({ id }),
                {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "Cache-Control": "no-store"
                    }
                }
            );
        }

        return env.ASSETS.fetch(request);
    }
};
