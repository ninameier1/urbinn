import { getAllPartners } from '@/lib/db/partners'

export default async function Footer() {
  const partners = await getAllPartners()
  return (
    <footer className="w-full border-t border-white/10 bg-main backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">

        <div>
          <h3 className="text-white font-semibold tracking-wide mb-2">
            Let's GLOW Flevoland
          </h3>
          <p className="text-white/60 mb-2">
            Samenwerkingsverband voor onderzoek naar een gezonde leefomgeving op wijkniveau in Flevoland.
          </p>
        </div>

        <div>
          <h4 className="text-white/80 font-medium mb-2">Het Onderzoek</h4>
          <ul className="space-y-1 text-white/60">
            <li><a href="/onderzoek" className="hover:text-white transition">GLOW</a></li>
            <li><a href="/gemeenten" className="hover:text-white transition">Gemeenten</a></li>
            <li><a href="/onderzoek/publicaties" className="hover:text-white transition">Publicaties</a></li>
            <li><a href="/onderzoek/ontstaan" className="hover:text-white transition">Ontstaan</a></li>

          </ul>
        </div>

        <div>
          <h4 className="text-white/80 font-medium mb-2">Het Consortium</h4>
          <ul className="space-y-1 text-white/60">
            <li><a href="/consortium" className="hover:text-white transition">Gezond Samenleven in Flevoland</a></li>
            {partners.map((partner) => (
              <li key={partner.id}>
                <a
                  href={`/consortium/${partner.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="hover:text-white transition"
                >
                  {partner.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white/80 font-medium mb-2">Contact</h4>
          <ul className="space-y-2 text-white/60">
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.988V9h3.102v1.561h.046c.432-.818 1.487-1.681 3.061-1.681 3.274 0 3.877 2.154 3.877 4.958v6.614zM5.337 7.433a1.8 1.8 0 1 1 0-3.601 1.8 1.8 0 0 1 0 3.601zm1.554 13.019H3.783V9h3.108v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                </svg>
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.756 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.756 0 12c0 3.244.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.756 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.704.072-4.948s-.014-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.244 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
                Instagram
              </a>
            </li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 text-center text-white/50 text-xs py-4">
        © {new Date().getFullYear()} Let's GLOW Flevoland! · Consortium-XL
      </div>
      
    </footer>
  );
}