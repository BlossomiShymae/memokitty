export const useTemplateFactory = (type) => {
  let template = "";
  let title = "";

  if (type === "feature-request") {
    template = `\
**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
            `;
    title = `Add \[feature\]`;
  }

  if (type === "bug-report") {
    template = `\
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Install the lib
2. Using the \`...\` class
3. Scroll down to '....'
4. See an error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Error**
Use \`.catch()\` to catch promise rejections or \`try...catch\` to catch any errors and paste the stack trace below

\`\`\`
// Error stack trace here
\`\`\`

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Desktop (please complete the following information):**
 - OS: [e.g. Windows 11]
 - Node.JS version [e.g. 16.x]
 - Library version [e.g. 1.0.1]
- Typescript version [e.g. 4.6.4]

**Additional context**
Would be best to include a code snippet here to help reproduce the bug quickly.


\`\`\`ts
// Code snippet that caused the error
\`\`\``;
    title = `\[BUG\] `;
  }

  if (type === "pull-request") {
    template = `\
### Changes
* Add \`sprite\` property to \`Champion\` structure that contains sprite information of a champion.
* Add new Jest test \`Check champion sprite\`.

Attempt to add feature request #32 for sprite information of a champion. This contains needed information goodies such as sprite image url, coordinates, and sizes. :3
`;
    title = `Add \[commits\]`;
  }

  const textarea = document.getElementById("issue_body");
  const titleinput = document.getElementById("issue_title");
  textarea.value = template;
  titleinput.value = title;
};
