const SIZE_GUIDE_SECTIONS: Record<string, string> = {
  ringSize: "rings",
  chainLength: "necklaces",
  bangleSize: "bracelets",
};

export function getSizeGuideHref(axisKey: string): string | undefined {
  const section = SIZE_GUIDE_SECTIONS[axisKey];
  return section ? `/size-guide#${section}` : undefined;
}
