export function contarPalabras(texto: string): Record<string, number> {
    const palabras = texto.split(/\s+/); // Divide el texto en palabras usando espacios y otros separadores.
    const conteoPalabras: Record<string, number> = {}; // Objeto para almacenar el conteo.
  
    palabras.forEach((palabra) => {
      const palabraLimpia = palabra.toLowerCase().replace(/[^a-zñáéíóúü]/gi, ''); // Limpia la palabra de caracteres especiales y la convierte a minúsculas.
      if (!palabraLimpia) return; // Si la palabra está vacía después de limpiar, continúa con la siguiente iteración.
  
      if (conteoPalabras[palabraLimpia]) {
        conteoPalabras[palabraLimpia] += 1; // Incrementael conteo si la palabra ya existe.
      } else {
        conteoPalabras[palabraLimpia] = 1; // Inicializa el conteo si la palabra es nueva.
      }
    });
    return conteoPalabras; // Retorna el objeto con el conteo de palabras.
  }

export function cosineSimilarity(text1:string, text2:string){
    const text1Words = contarPalabras(text1);
    const text2Words = contarPalabras(text2);
    //console.log(text1Words);
    //console.log(text2Words);
    let firstsum =0;
    let secondsum =0;
    let nominator = 0;
    let denominator =0;
    for (const word in text1Words) {

        if(text2Words[word] === undefined){
            text2Words[word] = 0;
        }
        firstsum += text1Words[word] * text1Words[word];
        secondsum += text2Words[word] * text2Words[word];
        denominator = Math.sqrt(firstsum) * Math.sqrt(secondsum);
        nominator += text1Words[word] * text2Words[word];
    }
    let result = nominator/denominator;
    return result
}

