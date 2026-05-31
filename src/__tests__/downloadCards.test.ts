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
  let createObjectURLSpy = vi.spyOn(URL, 'createObjectURL');

  beforeEach(() => {
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'blob:mock-url'),
      revokeObjectURL: vi.fn(),
    });

    createObjectURLSpy = vi.spyOn(URL, 'createObjectURL');
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should create a Blob with the actual CSV content', async () => {
    downloadCards([['1', people.results[0]]]);

    expect(createObjectURLSpy).toHaveBeenCalledTimes(1);

    const blobArgument = createObjectURLSpy.mock.calls[0][0];

    expect(blobArgument).toBeInstanceOf(Blob);

    if (blobArgument instanceof Blob) {
      expect(blobArgument.type).toBe('text/csv');
      const csvContent = await readBlobAsText(blobArgument);
      expect(csvContent).toEqual(BLOB);
    } else {
      throw new TypeError('blobArgument is not of type Blob');
    }
  });
});
