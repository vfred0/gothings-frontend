export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Contact = 'contact',
  Tag = 'tag',
  Back = 'back',
}

export function isTag(typeButton: ButtonType): boolean {
  return typeButton === ButtonType.Tag;
}

export function isBack(typeButton: ButtonType): boolean {
  return typeButton === ButtonType.Back;
}
