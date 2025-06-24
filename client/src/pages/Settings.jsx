import { Settings as SettingsIcon, Moon, Bell, User, Save } from "lucide-react";

export default function Settings({ theme, setTheme }) {
  return (
    <div className="rounded-lg bg-panel p-6 shadow-md text-text">
      <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-accent">
        <SettingsIcon size={24} />
        Settings
      </h2>

      {/* Profile Settings */}
      <div className="mb-6 rounded-xl bg-background p-4 shadow">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-accent/90">
          <User size={20} />
          Profile
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-muted mb-1">Name</label>
            <input
              type="text"
              defaultValue="Faisal"
              className="w-full rounded-md border border-border bg-panel px-3 py-2 text-text outline-none
                focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1">Email</label>
            <input
              type="email"
              defaultValue="faisal@example.com"
              className="w-full rounded-md border border-border bg-panel px-3 py-2 text-text outline-none
                focus:border-accent"
            />
          </div>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="mb-6 rounded-xl bg-background p-4 shadow">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-accent/90">
          <Moon size={20} />
          Appearance
        </h3>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted">Theme:</span>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={theme === "light"}
              onChange={(e) => setTheme(e.target.checked ? "light" : "dark")}
              className="peer sr-only"
            />
            <div
              className="peer h-6 w-11 rounded-full bg-border after:absolute after:start-[2px]
                after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-accent
                after:transition-all peer-checked:after:translate-x-full
                peer-checked:bg-accent/50"
            />
          </label>
          <span className="text-sm text-muted">
            {theme === "light" ? "Light" : "Dark"}
          </span>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="mb-6 rounded-xl bg-background p-4 shadow">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-accent/90">
          <Bell size={20} />
          Notifications
        </h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" className="accent-accent" defaultChecked />
            Email notifications
          </label>
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" className="accent-accent" />
            Push notifications
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          className="flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-white
            hover:brightness-110 transition-all duration-200 shadow"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
