'use server';

export async function getCSVContent(selectedCardsData: any[]): Promise<string> {
  const csvRows = ['id,name'];
  selectedCardsData.forEach(([id, card]) => {
    csvRows.push(`${id},"${card.name}"`);
  });
  return csvRows.join('\n');
}
