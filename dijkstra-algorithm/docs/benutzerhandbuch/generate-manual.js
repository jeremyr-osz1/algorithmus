const showdown = require('showdown');
const fs = require('fs');
const path = require('path');

const docsDirectory = __dirname;
const markdownPath = path.join(docsDirectory, 'benutzerhandbuch.md');
const outputPath = path.join(docsDirectory, 'index.html');
const stylesheetPath = 'benutzerhandbuch.css';

const converter = new showdown.Converter({
    customizedHeaderId: true,
    ghCompatibleHeaderId: true,
    openLinksInNewWindow: true,
    simpleLineBreaks: true,
    tables: true
});

/**
 * Replaces special characters in a string to create a URL-friendly slug, with specific handling for German characters and common substitutions.
 * @param {String} value 
 * @returns {String} 
 */
function slugify(value) {
    return value
        .trim()
        .toLowerCase()
        .replace(/a\*/g, 'a-star')
        .replace(/&/g, ' und ')
        .replace(/ae/g, 'ae')
        .replace(/oe/g, 'oe')
        .replace(/ue/g, 'ue')
        .replace(/ss/g, 'ss')
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Escapes special HTML characters in a string to prevent HTML injection.
 * @param {String} value 
 * @returns {String} 
 */
function escapeHtml(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/**
 * Adds unique IDs to all headings in the markdown for easier linking.
 * e.g. converts ## Some Heading to ## Some Heading {#some-heading} for linking and navigation.
 * @param {String} markdown 
 * @returns {String}
 */
function addHeadingIds(markdown) {
    return markdown.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, headingText) => {
        const cleanedHeading = headingText.replace(/\s+\{#.+\}\s*$/, '').trim();

        if (!cleanedHeading) {
            return match;
        }

        return `${hashes} ${cleanedHeading} {#${slugify(cleanedHeading)}}`;
    });
}

/**
 * Normalizes internal links in the markdown to use URL-friendly slugs.
 * e.g. converts [Link](#Some Heading) to [Link](#some-heading) for linking to headings with generated IDs.
 * @param {String} markdown 
 * @returns {String}
 */
function normalizeInternalLinks(markdown) {
    return markdown.replace(/\]\(#([^\)]+)\)/g, (match, anchor) => `](#${slugify(anchor)})`);
}

/**
 * Transforms markdown image syntax into HTML figure elements with optional width and height attributes and an id.
 * @param {String} markdown 
 * @returns {String}
 */
function transformImages(markdown) {
    return markdown.replace(
        /!\[([^\]]*)\]\(([^)\s]+)(?:\s*=\s*(\d*)x(\d*))?\)/g,
        (match, alt, source, width, height) => {
            const imageAttributes = [
                `src="${escapeHtml(source)}"`,
                `alt="${escapeHtml(alt)}"`,
                `id="image-${slugify(alt)}"`,
                'loading="lazy"'
            ];

            if (width) {
                imageAttributes.push(`width="${width}"`);
            }

            if (height) {
                imageAttributes.push(`height="${height}"`);
            }

            const caption = alt
                ? `<figcaption>${escapeHtml(alt)}</figcaption>`
                : '';

            return `\n<figure class="doc-figure"><img ${imageAttributes.join(' ')} />${caption}</figure>\n`;
        }
    );
}

function extractFirstHeading(markdown, level) {
    const match = markdown.match(new RegExp(`^#{${level}}\\s+(.+)$`, 'm'));
    return match ? match[1].trim() : '';
}

/**
 * Builds a complete HTML document by embedding the provided content and metadata into a structured template.
 * @param {String} contentHtml 
 * @param {Object} meta - Metadata for the document
 * @param {String} meta.title - The title of the document
 * @param {String} [meta.subtitle] - The subtitle of the document
 * @param {String} meta.generatedAt - The generation date of the document
 * @returns {String}
 */
function buildDocument(contentHtml, meta) {
    const title = meta.subtitle ? `${meta.title} - ${meta.subtitle}` : meta.title;

    return `<!doctype html>
<html lang="de">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escapeHtml(title)}</title>
        <link rel="stylesheet" href="${stylesheetPath}" />
    </head>
    <body>
        <div class="page">
            <header class="page-header">
                <div>
                    <p class="eyebrow">Routenberechnung Benutzerhandbuch</p>
                </div>
                <p class="page-note">Stand: ${escapeHtml(meta.generatedAt)}</p>
            </header>

            <main class="doc-shell">
                <article class="markdown-body">
${contentHtml}
                </article>
            </main>
            <div class="footer">
                <p class="page-tagline"><small>Dieses Dokument wurde mithilfe von <a href="https://github.com/showdownjs/showdown" target="_blank">Showdown.js</a> erstellt</small></p>
            </div>
        </div>
    </body>
</html>`;
}

const benutzerhandbuchMarkdown = fs.readFileSync(markdownPath, 'utf-8');
const preparedMarkdown = addHeadingIds(
    normalizeInternalLinks(transformImages(benutzerhandbuchMarkdown))
);

const benutzerhandbuchHtml = converter.makeHtml(preparedMarkdown);
const documentHtml = buildDocument(benutzerhandbuchHtml, {
    title: extractFirstHeading(benutzerhandbuchMarkdown, 1) || 'Benutzerhandbuch',
    subtitle: extractFirstHeading(benutzerhandbuchMarkdown, 2),
    generatedAt: new Intl.DateTimeFormat('de-DE', {
        dateStyle: 'long',
        timeStyle: 'short'
    }).format(new Date())
});

fs.writeFileSync(outputPath, documentHtml, 'utf-8');