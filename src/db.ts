const kv = await Deno.openKv();

export const incrementVisits = async () => {
    const key = ["visits", "total"];
    const current = (await kv.get<number>(key)).value || 0;
    await kv.set(key, current + 1);
};

export const getVisits = async () => {
    const key = ["visits", "total"];
    return (await kv.get<number>(key)).value || 0;
};
