const fs = require('fs');
const path = require('path');
const marked = require('marked');

// Path to the components
const componentsDir = path.join(__dirname, '..', 'src', 'directives');
// Path to the output directory
const outputDir = path.join(__dirname, 'components');
// Path to the template file
const templatePath = path.join(__dirname, 'includes', 'template.html');
// Path to the components list file
const componentsListPath = path.join(__dirname, 'components.html');
// Path to the components list template file
const componentsListTemplatePath = path.join(__dirname, 'includes', 'components-list-template.html');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read the template file
let template = '';
try {
  template = fs.readFileSync(templatePath, 'utf8');
} catch (error) {
  // If template doesn't exist, create a basic one
  template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Angular Awesome - {{COMPONENT_NAME}} Component</title>
    <link rel="stylesheet" href="../includes/styles.css">
</head>
<body>
    <header>
        <h1>{{COMPONENT_NAME}} Component</h1>
        <p>{{COMPONENT_DESCRIPTION}}</p>
        <div class="nav">
            <a href="../index.html">Home</a> |
            <a href="../components.html">Components</a> |
            <a href="../rules.html">Rules & Guidelines</a> |
            <a href="https://github.com/GedMarc/angular-awesome" target="_blank">GitHub Repository</a>
        </div>
    </header>

    <main>
        <section>
            <h2>Overview</h2>
            <p>{{COMPONENT_OVERVIEW}}</p>
        </section>

        <section>
            <h2>Import</h2>
            <p>Import the {{COMPONENT_NAME}} directive from the angular-awesome package:</p>
            <pre>// Import the {{COMPONENT_NAME}} directive
import { Wa{{COMPONENT_CLASS_NAME}}Directive } from 'angular-awesome/{{COMPONENT_NAME}}';</pre>
        </section>

        <section>
            <h2>Examples</h2>
            {{COMPONENT_EXAMPLES}}
        </section>

        <section>
            <h2>API Reference</h2>
            {{COMPONENT_API}}
        </section>

        <section>
            <h2>Styling</h2>
            {{COMPONENT_STYLING}}
        </section>
    </main>

    <footer>
        <p>&copy; 2025 Web Awesome Team. Licensed under MIT.</p>
    </footer>
</body>
</html>`;

  // Save the template for future use
  fs.writeFileSync(templatePath, template, 'utf8');
}

// Get all component directories
const componentDirs = fs.readdirSync(componentsDir)
  .filter(dir => fs.statSync(path.join(componentsDir, dir)).isDirectory());

// Process each component
componentDirs.forEach(componentDir => {
  const componentPath = path.join(componentsDir, componentDir);

  // Check for different naming patterns for example and rules files
  let examplePath = path.join(componentPath, `${componentDir}.example.md`);
  let rulesPath = path.join(componentPath, `${componentDir}.rules.md`);

  // Handle special cases with different naming conventions
  if (!fs.existsSync(examplePath)) {
    // Try alternative names (without hyphens, e.g., "textarea" instead of "text-area")
    const altName = componentDir.replace(/-/g, '');
    const altExamplePath = path.join(componentPath, `${altName}.example.md`);
    if (fs.existsSync(altExamplePath)) {
      examplePath = altExamplePath;
    } else if (componentDir === 'tooltitp') {
      // Special case for tooltitp which has files named tooltip
      const tooltipPath = path.join(componentPath, 'tooltip.example.md');
      if (fs.existsSync(tooltipPath)) {
        examplePath = tooltipPath;
      }
    }
  }

  if (!fs.existsSync(rulesPath)) {
    // Try alternative names (without hyphens, e.g., "textarea" instead of "text-area")
    const altName = componentDir.replace(/-/g, '');
    const altRulesPath = path.join(componentPath, `${altName}.rules.md`);
    if (fs.existsSync(altRulesPath)) {
      rulesPath = altRulesPath;
    } else if (componentDir === 'tooltitp') {
      // Special case for tooltitp which has files named tooltip
      const tooltipPath = path.join(componentPath, 'tooltip.rules.md');
      if (fs.existsSync(tooltipPath)) {
        rulesPath = tooltipPath;
      }
    }
  }

  // Skip if example or rules file doesn't exist after trying alternative names
  if (!fs.existsSync(examplePath) || !fs.existsSync(rulesPath)) {
    console.log(`Skipping ${componentDir} - missing example or rules file`);
    return;
  }

  // Read the example and rules files
  const exampleContent = fs.readFileSync(examplePath, 'utf8');
  const rulesContent = fs.readFileSync(rulesPath, 'utf8');

  // Extract component name and description
  const componentName = componentDir.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  const componentClassName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

  // Extract description from rules file using multiple patterns
  let componentDescription = '';

  // Try to extract from Overview section (first paragraph)
  const descriptionOverviewMatch = rulesContent.match(/## Overview\s*\n\s*\n([^\n]+)/);
  if (descriptionOverviewMatch) {
    componentDescription = descriptionOverviewMatch[1];
  }
  // Try to extract from first paragraph after the title
  else {
    const descriptionMatch = rulesContent.match(/^# .*?\n\n(.*?)(\n\n|$)/s);
    if (descriptionMatch) {
      componentDescription = descriptionMatch[1];
    }
  }

  // Try to extract from any section that describes what the component does
  if (!componentDescription) {
    const usageMatch = rulesContent.match(/is an? (.*?) (?:component|directive|element) that (.*?)[\.|\n]/i);
    if (usageMatch) {
      componentDescription = `<wa-${componentDir}> is an ${usageMatch[1]} component that ${usageMatch[2]}.`;
    }
  }

  // If still no description, create a generic one based on component name
  if (!componentDescription) {
    const readableName = componentName.replace(/([A-Z])/g, ' $1').trim();
    componentDescription = `<wa-${componentDir}> provides ${readableName.toLowerCase()} functionality for Angular applications.`;
  }

  // Remove any markdown backticks from the description
  componentDescription = componentDescription.replace(/`/g, '');

  // Extract overview from rules file (first section after the description)
  let componentOverview = '';
  const overviewSectionMatch = rulesContent.match(/^# .*?\n\n.*?\n\n## .*?\n\n(.*?)(\n\n## |$)/s);
  if (overviewSectionMatch) {
    componentOverview = overviewSectionMatch[1];
  }

  // Convert markdown to HTML for examples
  const exampleHtml = marked.parse(exampleContent);

  // Extract API reference and styling sections from rules file
  let apiSection = '';
  const apiMatch = rulesContent.match(/## API Reference\n\n(.*?)(\n\n## |$)/s);
  if (apiMatch) {
    apiSection = marked.parse(apiMatch[1]);
  }

  let stylingSection = '';
  const stylingMatch = rulesContent.match(/## Styling\n\n(.*?)(\n\n## |$)/s);
  if (stylingMatch) {
    stylingSection = marked.parse(stylingMatch[1]);
  }

  // Replace placeholders in the template
  let html = template
    .replace(/{{COMPONENT_NAME}}/g, componentName)
    .replace(/{{COMPONENT_CLASS_NAME}}/g, componentClassName)
    .replace(/{{COMPONENT_DESCRIPTION}}/g, componentDescription)
    .replace(/{{COMPONENT_OVERVIEW}}/g, componentOverview)
    .replace(/{{COMPONENT_EXAMPLES}}/g, exampleHtml)
    .replace(/{{COMPONENT_API}}/g, apiSection)
    .replace(/{{COMPONENT_STYLING}}/g, stylingSection)
    // Replace PAGE_* placeholders in the template.html file
    .replace(/PAGE_TITLE/g, `${componentName.charAt(0).toUpperCase() + componentName.slice(1)} Component`)
    .replace(/PAGE_SUBTITLE/g, componentDescription)
    .replace(/href="includes\/styles.css"/g, `href="../includes/styles.css"`)
    .replace(/href="index.html"/g, `href="../index.html"`)
    .replace(/href="getting-started.html"/g, `href="../getting-started.html"`)
    .replace(/href="components.html"/g, `href="../components.html"`)
    .replace(/href="rules.html"/g, `href="../rules.html"`)
    .replace(/href="components\//g, `href="`)
    .replace(/PAGE_CONTENT/g, `
      <section>
        <h2>Overview</h2>
        <p>${componentOverview}</p>
      </section>

      <section>
        <h2>Import</h2>
        <p>Import the ${componentName} directive from the angular-awesome package:</p>
        <pre>// Import the ${componentName} directive
import { Wa${componentClassName}Directive } from 'angular-awesome/${componentDir}';</pre>
      </section>

      <section>
        <h2>Examples</h2>
        ${exampleHtml}
      </section>

      <section>
        <h2>API Reference</h2>
        ${apiSection}
      </section>

      <section>
        <h2>Styling</h2>
        ${stylingSection}
      </section>
    `);

  // Write the HTML file
  const outputPath = path.join(outputDir, `${componentDir}.html`);
  fs.writeFileSync(outputPath, html, 'utf8');

  console.log(`Generated documentation for ${componentDir}`);
});

// Generate the components list page
let componentsListTemplate = '';
try {
  componentsListTemplate = fs.readFileSync(componentsListTemplatePath, 'utf8');
} catch (error) {
  console.error(`Error reading components list template: ${error.message}`);
  console.log('Skipping components list generation');
  console.log('Documentation generation complete!');
  return;
}

// Generate component cards HTML
let componentCardsHtml = '';
const componentCategories = {
  'button': 'input',
  'input': 'input',
  'select': 'input',
  'text-area': 'input',
  'checkbox': 'input',
  'radio': 'input',
  'switch': 'input',
  'slider': 'input',
  'menu': 'navigation',
  'tabs': 'navigation',
  'breadcrumb': 'navigation',
  'pagination': 'navigation',
  'tree': 'navigation',
  'card': 'layout',
  'grid': 'layout',
  'page': 'layout',
  'panel': 'layout',
  'divider': 'layout',
  'alert': 'feedback',
  'dialog': 'feedback',
  'drawer': 'feedback',
  'progress': 'feedback',
  'spinner': 'feedback',
  'toast': 'feedback',
  'tooltip': 'feedback',
  'table': 'data',
  'list': 'data',
  'avatar': 'data',
  'badge': 'data',
  'tag': 'data',
  'icon': 'utility',
  'dropdown': 'utility',
  'popover': 'utility',
  'date-picker': 'utility',
  'time-picker': 'utility',
  'color-picker': 'utility'
};

// Sort components alphabetically
componentDirs.sort();

componentDirs.forEach(componentDir => {
  const componentPath = path.join(componentsDir, componentDir);
  const rulesPath = path.join(componentPath, `${componentDir}.rules.md`);

  // Skip if rules file doesn't exist
  if (!fs.existsSync(rulesPath)) {
    return;
  }

  // Read the rules file
  const rulesContent = fs.readFileSync(rulesPath, 'utf8');

  // Extract component name and description
  const componentName = componentDir.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

  // Extract description from rules file using multiple patterns
  let componentDescription = '';

  // Try to extract from Overview section (first paragraph)
  const descriptionOverviewMatch = rulesContent.match(/## Overview\s*\n\s*\n([^\n]+)/);
  if (descriptionOverviewMatch) {
    componentDescription = descriptionOverviewMatch[1];
  }
  // Try to extract from first paragraph after the title
  else {
    const descriptionMatch = rulesContent.match(/^# .*?\n\n(.*?)(\n\n|$)/s);
    if (descriptionMatch) {
      componentDescription = descriptionMatch[1];
    }
  }

  // Try to extract from any section that describes what the component does
  if (!componentDescription) {
    const usageMatch = rulesContent.match(/is an? (.*?) (?:component|directive|element) that (.*?)[\.|\n]/i);
    if (usageMatch) {
      componentDescription = `<wa-${componentDir}> is an ${usageMatch[1]} component that ${usageMatch[2]}.`;
    }
  }

  // If still no description, create a generic one based on component name
  if (!componentDescription) {
    const readableName = componentName.replace(/([A-Z])/g, ' $1').trim();
    componentDescription = `<wa-${componentDir}> provides ${readableName.toLowerCase()} functionality for Angular applications.`;
  }

  // Remove any markdown backticks from the description
  componentDescription = componentDescription.replace(/`/g, '');

  // Determine category
  const category = componentCategories[componentDir] || 'utility';

  // Create component card HTML
  // Format the component name for display (capitalize first letter)
  const displayName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

  componentCardsHtml += `
            <div class="component-card" data-category="${category}">
                <h3>${displayName} <span class="tag">${category.charAt(0).toUpperCase() + category.slice(1)}</span></h3>
                <p>${componentDescription}</p>
                <div class="links">
                    <a href="components/${componentDir}.html">Documentation</a>
                    <a href="https://github.com/GedMarc/angular-awesome/tree/master/src/directives/${componentDir}" target="_blank">Source</a>
                </div>
            </div>`;
});

// Replace placeholder in template
const componentsListHtml = componentsListTemplate.replace('{{COMPONENT_CARDS}}', componentCardsHtml);

// Write the components list file
fs.writeFileSync(componentsListPath, componentsListHtml, 'utf8');

console.log('Components list generation complete!');
console.log('Documentation generation complete!');
