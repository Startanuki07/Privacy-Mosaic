# ✨ Mask Avatars, Usernames, and IDs on Web Pages

**Blurs or redacts avatars, usernames, and IDs on web pages.**

---

> 💡 **Overview**
> Privacy Mosaic hides avatars, usernames, and user IDs on a page by blurring them or covering them with a redaction fill. It includes built-in rules for common patterns and lets you create your own rules by clicking the elements you want hidden. A Rule Manager lists the rules saved for every site, and Alt + Click reveals a single masked element.

---

## 🎛 Getting Started

| Icon | Feature Name | Where It Appears |
|------|---|---|
| 🔘 | Masking button | A round button at the top center of the page, on sites where you have turned the button on. It stays transparent until you move the pointer over it. Click it to switch masking on or off. Right-click it to open the panel. |
| 🧩 | Control panel | A movable side panel with Masking, Options, and Rules tabs. It opens from a right-click on the masking button or from **Open Panel** in your userscript manager's menu. |
| 📋 | Userscript manager menu | Commands for opening the panel, toggling masking, showing the button for the current visit, and keeping the button visible on the current site. |

> 💡 The masking button stays hidden on every site by default. Use **Open Panel** from the userscript manager menu, or turn the button on for a site (see Additional Features).

---

## 🚀 Core Features

### 🎭 Blur or Redact

Covers avatars, usernames, and IDs with a blur or a redaction fill.

- Turn masking on with the masking button, the **Enable masking** switch in the panel, or **Toggle Masking** in the userscript manager menu. The switch applies to every rule, built-in and custom.
- Choose **Blur** or **Redact** in the Masking tab. Blur softens the element. Redact covers text with a fill and replaces images with a placeholder.
- The gear icon on the Redact button selects the fill for text: Solid, Mosaic, Checker, or Noise.
- The Intensity slider sets the blur strength. In Redact mode, it applies only to the Mosaic and Checker fills.
- The panel footer shows how many elements are currently masked.

### 🛡 Built-in Rules

Applies to common avatar, username, and user ID patterns on every site.

- 55 built-in rules run while masking is on.
- The script masks text that looks like an @username mention inside posts, comments, cards, and messages.
- The bar at the top of the Rules tab shows whether the built-in rules are active and how many elements they matched on the current page.
- The 🟠 button on that bar outlines built-in matches in amber, which separates them from matches made by your own rules.

### 🎯 Custom Rules

Hides specific elements on a site by picking them directly on the page.

- Open the Rules tab and click **+ Add Rule**. Click the element you want hidden, or press ESC to cancel.
- Give the rule a name and save it. The rule applies to that site only.
- The Rules tab lists the rules for the site you are viewing. Each rule has its own on/off switch and can be re-detected or deleted.

### 🗂 Rule Manager

Lists every saved rule across all sites in one window.

- Open it with the **Rule Manager** button on the Rules tab or **Manage →** on the built-in rules bar.
- The window groups rules by site, showing the site's icon and a rule count. The current site appears first.
- Each rule has an on/off switch, an edit button, and a delete button. The window marks rules that belong to other sites as **Off-site**.
- The built-in rules have their own switch here, plus a list of all 55 rules. You can switch each rule, or each group (Avatars, Usernames, IDs), on or off. A reset button restores every disabled built-in rule.

### 🚫 Reveal One Element

Removes the mask from a single element.

- Hold Alt and click a masked element. The element stays visible until you reload the page.
- The click does not trigger the element's normal action, such as opening a link.

---


## ⚠️ Experimental Features & Known Limitations

### Known Constraints & Limitations

- **Coverage:** The built-in rules recognize common patterns and cannot cover every site. Many pages need your own rules for the elements you want hidden. The script masks @username mentions only inside posts, comments, cards, and messages, and only when the name has between 2 and 30 characters.
- **Embedded frames:** The script runs on the main page only. Content shown inside embedded frames is not masked.
- **Rules from other sites:** You can rename, switch on or off, or delete a rule saved on one site from any page. Picking a new target element for that rule requires a visit to its site.
- **Timing:** The script masks content that loads after the page finishes, such as new posts while scrolling, a short moment after it appears.

---

## ⚙️ Additional Features

### Auto-Start Masking

The **Persistent ON** switch in the Options tab starts masking automatically on every new page load.

- Switching masking on or off with the button or the menu also updates this switch, so the most recent choice carries over to the next page.

### Button Visibility

The masking button stays hidden until you turn it on for a site.

- Turn on **Show button on this site** in the Options tab to keep the button visible each time you load the current site.
- The Options tab also holds a list of sites with the button shown, one domain per line, which you can edit directly.
- The userscript manager menu offers **Show Button (this visit only)** and **Always Show Button on This Site**.

### Icon Size

The Icon size slider in the Options tab changes the size of the masking button. A reset button in the same row restores the default size.

### Light and Dark Theme

The sun and moon button in the panel header switches the panel between the dark and light themes.

### Movable Panel

Drag the handle at the top of the panel to move it. The panel remembers its position, and double-clicking the handle returns it to the default position.

---

## 🔐 Security & Privacy Notice

> ⚠️ **This script saves your rules and settings on your device. It does not access cookies, passwords, or login sessions.**

| Data Type | Source | Purpose | Storage | Transmitted To |
|---|---|---|---|---|
| Rule names, the elements they target, and site names | You create them | Remember what to mask on each site | Your userscript manager, on this device | Site names go to Google's favicon service only when you open the Rule Manager |
| Settings such as masking style, intensity, theme, button size, panel position, and the sites where the button stays visible | You choose them | Restore your preferences on later visits | Your userscript manager, on this device | Nowhere |

**This script does not send your rules or settings to any server. The only outgoing request is the site icon lookup described under Third-Party Services & Dependencies.**

> 💡 **Icon lookups only occur if you open the Rule Manager.**
> The script saves nothing about a site until you create a rule or turn on the button for that site.
> All other features work without any network requests from the script.

---

- This userscript is primarily maintained on Greasy Fork.
- Built with AI assistance by a hobbyist developer. Bug fixes and updates may not be immediate.
- Feedback is welcome. Responses may be assisted by translation tools if needed.
