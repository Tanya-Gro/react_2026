import { BLOB } from 'mocks';
import { people } from 'mocks';
import { downloadCards } from 'helpers';

vi.stubGlobal('URL', {
  createObjectURL: vi.fn(() => 'blob:mock-url'),
  revokeObjectURL: vi.fn(),
});

async function readBlobAsText(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', (e: ProgressEvent<FileReader>): void => {
      const result = e.target?.result;

      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('FileReader result is not of type string'));
      }
    });

    reader.onerror = (): void => {
      reject(new Error('FileReader failed to read blob'));
    };

    reader.readAsText(blob);
  });
}

describe('handleDownload', () => {
  it('should create a Blob with the actual CSV content', async () => {
    const blob = downloadCards([['1', people.results[0]]]);

    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('text/csv;charset=utf-8');

    const csvContent = await readBlobAsText(blob);

    expect(csvContent).toEqual(BLOB);
  });
});
