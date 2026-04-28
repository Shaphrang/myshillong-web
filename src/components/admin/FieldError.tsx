export function FieldError({ error }: { error?: string }) { return error ? <p className="text-xs text-rose-600">{error}</p> : null; }
