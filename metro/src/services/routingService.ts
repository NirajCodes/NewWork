import type { MetroData, RouteInfo } from '../types';

export function findRoute(
  sourceId: string,
  destinationId: string,
  data: MetroData
): RouteInfo | null {
  if (sourceId === destinationId) return null;

  const source = data.stations.find(s => s.id === sourceId);
  const dest = data.stations.find(s => s.id === destinationId);
  if (!source || !dest) return null;

  // check direct line
  const directLineId = source.lines.find(l => dest.lines.includes(l));
  if (directLineId) {
    const line = data.lines.find(l => l.id === directLineId)!;
    const startIdx = line.stations.indexOf(sourceId);
    const endIdx = line.stations.indexOf(destinationId);
    if (startIdx !== -1 && endIdx !== -1) {
      const slice = startIdx < endIdx ?
        line.stations.slice(startIdx, endIdx + 1) :
        line.stations.slice(endIdx, startIdx + 1).reverse();
      const path = slice.map(id => data.stations.find(s => s.id === id)!);
      return {
        path,
        linesUsed: [line],
        interchanges: [],
        totalStops: Math.abs(endIdx - startIdx),
        estimatedTimeMinutes: Math.abs(endIdx - startIdx) * 2 + 3,
      };
    }
  }

  // one interchange
  for (const line1Id of source.lines) {
    for (const line2Id of dest.lines) {
      if (line1Id === line2Id) continue;
      const line1 = data.lines.find(l => l.id === line1Id)!;
      const line2 = data.lines.find(l => l.id === line2Id)!;
      for (const interchangeId of line1.stations) {
        if (line2.stations.includes(interchangeId)) {
          const path1 = findRoute(sourceId, interchangeId, data);
          const path2 = findRoute(interchangeId, destinationId, data);
          if (path1 && path2) {
            const path = [...path1.path, ...path2.path.slice(1)];
            return {
              path,
              linesUsed: [line1, line2],
              interchanges: [data.stations.find(s => s.id === interchangeId)!],
              totalStops: path1.totalStops + path2.totalStops,
              estimatedTimeMinutes: path1.estimatedTimeMinutes + path2.estimatedTimeMinutes,
            };
          }
        }
      }
    }
  }

  return null;
}
