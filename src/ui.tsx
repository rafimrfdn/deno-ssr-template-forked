/** @jsxImportSource https://esm.sh/preact */

/** Note: it's not a react js code. That means no hooks or client-side features available.
 * JSX here is just a templating language for html
 */
import type { ComponentChild } from "npm:preact";

const websiteName = "Deno SSR Template";

function Layout({ children }: { children: ComponentChild }) {
    return (
        <html data-theme="light">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
                />
                <title>{websiteName}</title>
            </head>
            <body>
                <header class="container" style="padding-bottom: 0">
                    <nav class="grid">
                        <ul>
                            <li>
                                <strong>{websiteName}</strong>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <a href="/" class="secondary">Home</a>
                            </li>
                            <li>
                                <a href="/about" class="secondary">About</a>
                            </li>
                        </ul>
                    </nav>
                </header>

                <hr />

                <main class="container">
                    {children}
                </main>

                <hr />

                <footer class="container">
                    <p>
                        Built with ❤️ using <a href="https://deno.land" target="_blank">Deno</a> and
                        {" "}
                        <a href="https://preactjs.com/" target="_blank">Preact</a>. Styled with{" "}
                        <a href="https://picocss.com/" target="_blank">Pico.css</a>.
                    </p>
                </footer>
            </body>
        </html>
    );
}

export function HomePage() {
    return (
        <Layout>
            <section class="grid align-center">
                <h1>Welcome to {websiteName}</h1>
                <p>A simple template to kickstart your Deno + Preact SSR project.</p>
                <div class="align-center">
                    <a href="/about" role="button" class="secondary">Learn More</a>
                </div>
            </section>
        </Layout>
    );
}

export function AboutPage({ visitedCount }: { visitedCount: number }) {
    return (
        <Layout>
            <section class="grid align-center">
                <h3>About {websiteName}</h3>
                <p>This is a simple website built with Deno and Preact.</p>
                <p>It uses a key-value store to count the number of visits.</p>
                <p>
                    <strong>Number of visits:</strong> {visitedCount}
                </p>
                <div class="align-center">
                    <a href="/" role="button">Go Back Home</a>
                </div>
            </section>
        </Layout>
    );
}
