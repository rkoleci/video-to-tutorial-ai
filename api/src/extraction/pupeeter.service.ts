import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PuppeteerYoutubeSubtitlesService {
  async fetchSubtitles(videoUrl: string): Promise<any> {
    const browser = await puppeteer.launch({
      headless: 'new' as any,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setRequestInterception(true);

    let subtitleApiUrl: string | null = null;

    page.on('request', (request) => {
      const url = request.url();
      if (url.includes('/api/timedtext')) {
        subtitleApiUrl = url;
      }
      request.continue();
    });

    await page.goto(videoUrl, {
      waitUntil: 'networkidle2',
      timeout: 0,
    });

    // Fake wait using setTimeout wrapped in a Promise
    await new Promise(resolve => setTimeout(resolve, 3000));

    await browser.close();

    if (!subtitleApiUrl) {
      throw new Error('Subtitle URL not found');
    }
    console.log(111, 'subtitleApiUrl', subtitleApiUrl)
    // Fetch subtitle JSON using native fetch (Node.js 18+)
    const res = await fetch(subtitleApiUrl);
    const contentType = res.headers.get('content-type') || '';

    if (!contentType.includes('application/json')) {
      const text = await res.text();
      console.error('❌ Expected JSON but got:', contentType, '\nBody:', text.slice(0, 200));
      throw new Error('Expected JSON subtitle response, got something else.');
    }

    try {
      const json = await res.json();
      return json;
    } catch (err) {
      const body = await res.text();
      console.error('❌ Failed to parse subtitle JSON:\n', body.slice(0, 200));
      throw new Error('Failed to parse subtitle JSON: ' + err);
    }
  }
}
