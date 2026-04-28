'use client';
export function ConfirmDeleteButton() { return <button type="submit" className="rounded border px-2 py-1 text-xs text-rose-600" onClick={(e)=>{if(!confirm('Delete this record?')) e.preventDefault();}}>Delete</button>; }
