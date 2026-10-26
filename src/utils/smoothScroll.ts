export function scrollToTarget(targetId: string, offset = 80): void {
  const id = targetId.replace(/^#/, '');
  const elem = document.getElementById(id);
  if (elem) {
    const top = elem.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}
