// Global site constants — imported across pages and components.

export const SITE_TITLE = '0x156';
export const SITE_TAGLINE = 'Anonymous research at the edge of AI and Web3.';
export const SITE_DESCRIPTION =
	'Independent research and technical notes on autonomous agents, zero-knowledge ML, decentralized inference, and the intersection of large language models with on-chain systems.';

// Set to null to hide the CV link in the header.
export const CV_URL: string | null = null;

// Public contact details — used in Footer.
// Replace PGP_FINGERPRINT with your real fingerprint; keep EMAIL as a ProtonMail alias.
export const CONTACT = {
	handle: '0x156',
	email: 'contact@0x156.com',
	pgpFingerprint: '0000 0000 0000 0000 0000  0000 0000 0000 0000 0000',
	pgpKeyUrl: '/pgp.txt',
};

export type SocialIcon = 'email' | 'github' | 'rss' | 'key';

// Keep this minimal for an anonymous persona. Fill in real handles later.
export const SOCIAL_LINKS: ReadonlyArray<{
	label: string;
	href: string;
	icon: SocialIcon;
}> = [
	{
		label: 'Email (ProtonMail)',
		href: 'mailto:contact@0x156.com',
		icon: 'email',
	},
	{
		label: 'PGP public key',
		href: '/pgp.txt',
		icon: 'key',
	},
	{
		label: 'RSS feed',
		href: '/rss.xml',
		icon: 'rss',
	},
];

// SEO metadata for structured data (JSON-LD).
export const AUTHOR = {
	name: '0x156',
	alternateName: 'zero-x-one-five-six',
	url: 'https://0x156.com',
	jobTitle: 'Independent Researcher',
	description:
		'Pseudonymous researcher working on AI agents, zero-knowledge machine learning, and decentralized infrastructure.',
	sameAs: [] as string[], // Add social profile URLs here if/when public.
};
