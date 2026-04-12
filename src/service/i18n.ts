/**
 * Lightweight internal i18n stub to replace the external `i18n` package.
 * This provides minimal functionality used across the codebase:
 * - configure(options): no-op
 * - __(message | { phrase, locale }, replacements?): simple interpolation
 *
 * We intentionally keep behaviour minimal: return the message key or
 * interpolate $property / $constraintN placeholders. This removes the
 * runtime dependency on the external `i18n` library while keeping
 * existing call sites working.
 */

type Phrase = string | { phrase: string; locale?: string };

function interpolate(msg: string, replacements?: any) {
    if (!replacements) return msg;
    let out = msg;
    for (const k of Object.keys(replacements)) {
        const v = replacements[k];
        // replace $key occurrences
        out = out.replace(new RegExp(`\\$${k}`, 'g'), String(v));
    }
    return out;
}

const i18nStub = {
    configure: (_opts: any) => {
        // no-op
    },
    // Support both __('key', replacements) and __({ phrase, locale }, replacements)
    __: (phrase: Phrase, replacements?: any) => {
        const msg = typeof phrase === 'string' ? phrase : phrase.phrase || '';
        return interpolate(msg, replacements);
    },
    setLocale: (_locale: string) => {
        // no-op: this stub does not persist translations
        return;
    },
};

export default i18nStub;
