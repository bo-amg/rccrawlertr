module.exports = function(eleventyConfig) {
  // Statik dosyaları kopyala
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/css");
  
  // Tarih filtresi
  eleventyConfig.addFilter("tarihFormat", (dateObj) => {
    return new Date(dateObj).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  // Limit filtresi (array'den ilk N eleman)
  eleventyConfig.addFilter("limit", (array, limit) => {
    return array.slice(0, limit);
  });

  // Koleksiyon: İncelemeler
  eleventyConfig.addCollection("incelemeler", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/incelemeler/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // Koleksiyon: Rehberler
  eleventyConfig.addCollection("rehberler", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/rehberler/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // Koleksiyon: Karşılaştırmalar
  eleventyConfig.addCollection("karsilastirmalar", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/karsilastirmalar/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk"
  };
};
