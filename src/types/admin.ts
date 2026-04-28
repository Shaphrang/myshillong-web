export type ActionState = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
};

export type AdminNavItem = {
  label: string;
  href: string;
};
