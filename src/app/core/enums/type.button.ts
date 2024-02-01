export enum TypeButton {
  Primary = 'primary',
  Secondary = 'secondary',
  Contact = 'contact',
  Tag = 'tag',
  Back = 'back',
}

export function isTag(typeButton: TypeButton): boolean {
  return typeButton === TypeButton.Tag;
}

export function isBack(typeButton: TypeButton): boolean {
  return typeButton === TypeButton.Back;
}