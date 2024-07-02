
type Document = { id: number; doc: string };

export class TFIDF {
    private documents: Document[] = [];
    private termFrequency: Record<string, Record<number, number>> = {};
    private inverseDocumentFrequency: Record<string, number> = {};

    addDocument(doc: string, id: number): void {
        this.documents.push({ id, doc });
        const terms = this.tokenize(doc);

        terms.forEach(term => {
            if (!this.termFrequency[term]) {
                this.termFrequency[term] = {};
            }
            if (!this.termFrequency[term][id]) {
                this.termFrequency[term][id] = 0;
            }
            this.termFrequency[term][id] += 1;
        });
    }

    calculateIDF(): void {
        const numDocs = this.documents.length;
        Object.keys(this.termFrequency).forEach(term => {
            const numDocsWithTerm = Object.keys(this.termFrequency[term]).length;
            this.inverseDocumentFrequency[term] = Math.log(numDocs / (1 + numDocsWithTerm));
        });
    }

    private tokenize(text: string): string[] {
        return text.toLowerCase().split(/\W+/).filter(term => term.length > 0);
    }

    calculateTFIDF(doc: string): Record<string, number> {
        const terms = this.tokenize(doc);
        const tfidfScores: Record<string, number> = {};

        terms.forEach(term => {
            const tf = terms.filter(t => t === term).length / terms.length;
            const idf = this.inverseDocumentFrequency[term] || 0;
            tfidfScores[term] = tf * idf;
        });

        return tfidfScores;
    }

    getSimilarity(doc1: string, doc2: string): number {
        const tfidf1 = this.calculateTFIDF(doc1);
        const tfidf2 = this.calculateTFIDF(doc2);
        const uniqueTerms = new Set([...Object.keys(tfidf1), ...Object.keys(tfidf2)]);

        let Producto = 0;
        let magnitud1 = 0;
        let magnitud2 = 0;

        uniqueTerms.forEach(term => {
            const puntaje1 = tfidf1[term] || 0;
            const puntaje2 = tfidf2[term] || 0;
            Producto += puntaje1 * puntaje2;
            magnitud1 += puntaje1 ** 2;
            magnitud2 += puntaje2 ** 2;
        });

        return Producto / (Math.sqrt(magnitud1) * Math.sqrt(magnitud2));
    }
}