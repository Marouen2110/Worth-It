export interface AnnonceLBC {
  error: string | null;
  data: {
    title: string;
    description: string;
    image: string;
    price: number;
    shippingFees: number | null;
    currency: string;
    isInStock: boolean | null;
    EAN13: string | null;
    ASIN: string | null;
    ISBN: string | null;
    color: string | null;
    brand: string | null;
    category: {
      name: string;
      url: string;
    };
    categories: Array<{
      name: string;
      url: string;
    }>;
    siteURL: string;
    siteHtml: string | null;
    productHasVariations: string | null;
    error: string | null;
    statusCode: string | null;
    isFinished: string | null;
    isDead: string | null;
    htmlLength: number;
    captchaFound: boolean;
    isHtmlPage: boolean;
    host: string;
  };
  version?: number;
  id: number;
}
