const em = (text) => `<em>${text}</em>`;
const link = (url) => `<a href='${url}' target='_blank' rel='noreferrer noopener nofollow'>${url}</a>`;
// export const wrap = (tag, tagOptions, text) => `<${tag} ${tagOptions}>${text}</${tag}>`;

module.exports = {
    em,
    link
}