export const openBrowser = () => {
    // Automatically open the browser
    try {
        let command: Deno.Command;
        if (Deno.build.os === "windows") {
            // Windows-specific command
            command = new Deno.Command("cmd", {
                args: ["/c", "start", "http://localhost:8000"],
            });
        } else if (Deno.build.os === "darwin") {
            // macOS-specific command
            command = new Deno.Command("open", {
                args: ["http://localhost:8000"],
            });
        } else if (Deno.build.os === "linux") {
            // Linux-specific command
            command = new Deno.Command("xdg-open", {
                args: ["http://localhost:8000"],
            });
        } else {
            throw new Error("Unsupported operating system");
        }

        const process = command.spawn(); // Execute the command
        process.output(); // Await the output (optional if you don't need feedback)
    } catch (error) {
        console.error("Failed to open browser:", error);
    }
};
