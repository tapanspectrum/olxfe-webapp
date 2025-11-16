// src/app/shared/services/seo.service.ts
import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class SeoService {
    constructor(private title: Title, private meta: Meta) { }

    updateMeta(
        title: string,
        description: string,
        keywords: string = '',
        image: string = ''
    ): void {
        // Title
        this.title.setTitle(title);

        // Description
        this.meta.updateTag({ name: 'description', content: description });

        // Keywords (optional)
        if (keywords) {
            this.meta.updateTag({ name: 'keywords', content: keywords });
        }

        // Robots (default allow index, override if needed)
        this.meta.updateTag({ name: 'robots', content: 'index, follow' });

        // Open Graph tags
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ property: 'og:description', content: description });

        if (image) {
            this.meta.updateTag({ property: 'og:image', content: image });
        }
    }

    // Special case: noindex for sensitive pages (like login, register, checkout, etc.)
    setNoIndex(): void {
        this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    }
}
