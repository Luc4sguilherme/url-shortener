export default function formatUrl(url: string) {
  return url.replace(/http:\/\/|https:\/\/|\//g, '');
}
