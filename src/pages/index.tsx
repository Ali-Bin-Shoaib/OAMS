import { signIn, signOut, useSession } from 'next-auth/react';
import { Anchor, Loader, Tooltip, UnstyledButton } from '@mantine/core';
import img1 from '../../public/static_imgs/2.jpg';
import withsponsor from '../../public/static_imgs/withsponsor.png';
import withoutsponsor from '../../public/static_imgs/withoutsponsor.png';
import instagram from '../../public/static_imgs/instagram.png';
import facebook from '../../public/static_imgs/facebook.png';
import whatsap from '../../public/static_imgs/whatsap.png';
import twitter from '../../public/static_imgs/twitter.png';
import socials from '../../public/static_imgs/socials.png';
import helgh from '../../public/static_imgs/helgh.png';
import Education from '../../public/static_imgs/Education.png';
import aboutus from '../../public/static_imgs/aboutus.png';
import offer from '../../public/static_imgs/offer.png';
import output from '../../public/static_imgs/output.png';
import house from '../../public/static_imgs/house.png';
import boys from '../../public/static_imgs/boys.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IconLogin } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import Link from 'next/link';
export default function Home() {
	const [hydration, setHydration] = useState(false);
	const { data: session } = useSession();
	const router = useRouter();
	useEffect(() => {
		setHydration(true);
	}, []);

	if (!hydration) return <Loader />;
	return (
		<div>
			{/* {!session && (
				<nav className='nav'>
					<div className='title'>
						<Image className='icon' src={img1} alt='logo' />
						<h2 className='title-home'>
							Dar <span>Al-Fajar</span>
						</h2>
					</div>
					<ul className='pages' id='action'>
						<li className='l-pages'>
							<a href='#home' className='a'>
								Home
							</a>
						</li>
						<li className='l-pages'>
							<a href='#about' className='a'>
								About
							</a>
						</li>
						<li className='l-pages'>
							<a href='#services' className='a'>
								Services
							</a>
						</li>
						<li className='l-pages'>
							<a href='#content' className='a'>
								contact
							</a>
						</li>
					</ul>
					{!session && (
						<Tooltip label='Login'>
							<UnstyledButton className='btnlog'>
								<IconLogin onClick={() => signIn()} />
							</UnstyledButton>
						</Tooltip>
					)}{' '}
					<button id='menu'>
						<span></span>
						<span></span>
						<span></span>
					</button>
				</nav>
			)} */}
			<section className='home'>
				<Anchor target={'home'}></Anchor>
				<div className='content'>
					<div className='content-texts'>
						<h1>Dar Al-Fajr</h1>
						<h4>
							For the Care and Rehabilitation of <span>Orphans </span>
						</h4>
						<div className='social'>
							<a href='https://instagram.com/daralfjr' target='_blank' className='social-img'>
								<Image width={40} className='img' src={instagram} alt='' />
							</a>
							<a href='https://wa.me/+967772730370?text=Hello' target='_blank' className='social-img'>
								<Image width={35} className='img' src={whatsap} alt='' />
							</a>
							<a href='https://twitter.com/daralfjr2' target='_blank' className='social-img'>
								<Image width={40} className='img' src={twitter} alt='' />
							</a>
							<a href='http://bit.ly/alfjr2004' target='_blank' className='social-img'>
								<Image width={40} className='img' src={facebook} alt='' />
							</a>
						</div>
					</div>

					<div className='sponsor'>
						<div className='imgspon'>
							<Image width={70} src={withsponsor} alt='' />
							<h2> Sponsored orphans </h2>
							<h5>42</h5>
						</div>
						<div className='imgspon'>
							<Image width={70} src={withoutsponsor} alt='' />
							<h2> Unsponsored orphans </h2>
							<h5>21</h5>
						</div>
					</div>

					<div className='content-imgs'>
						<Image width={500} src={boys} alt='' className='pic' />
					</div>
				</div>
			</section>

			<Anchor target='about'></Anchor>
			<section className='about'>
				<div className='depabout1'>
					<div className=' content-imgs '>
						<Image src={aboutus} alt='' />
					</div>
					<div className='content-texts'>
						<h1> About us </h1>
						<p>
							This Dar is an important vital project, and it is one of the pioneering social projects at the level of Hadramout
							governorate in sponsoring orphans, raising them, caring for them, and rehabilitating them since 2009.
						</p>
						<p>
							<span className='span'>Locatio : </span>
							Republic of Yemen / Hadramout / Mukalla / Fuwa - Al Masaken / behind Fuwa Educational Complex for Girls
						</p>
						<p>
							<span className='span'>Authority : </span>
							Office of the Ministry of Social Affairs and Labor in Hadramout Coast, in partnership with Al-Fajr Social Charity
							Foundation
						</p>
						<p>
							<span className='span'>Our Vision : </span>
							Distinguished care in social, psychological and developmental services aimed at rehabilitating the orphan and
							raising his own abilities to live a decent life
						</p>
						<p>
							<span className='span'>Our Mission : </span>
							lead in the care and rehabilitation of orphans through distinguished competencies and comprehensive programs
						</p>
					</div>
				</div>

				<div className='depabout2'>
					<div className=' content-imgs '>
						<Image src={offer} alt='' />
					</div>
					<div className='content-texts'>
						<h1> What the home offers to orphans </h1>

						<p>
							<span className='span'>Accommodation Program : </span> <br />
							This program provides orphans residing in the home with social care, including subsistence, housing, clothing,
							nutrition, educational care, health care, integrated educational care, rehabilitation, developmental,
							professional and vocational courses, and targeted recreational activities
						</p>
						<p>
							<span className='span'>Sponsorship program : </span> <br />
							This program provides monthly cash assistance and in-kind assistance to orphans who reside outside the home with
							their families, and establishes educational, rehabilitative and recreational programs and activities as well as
							developmental, vocational and craft courses.
						</p>
						<p>
							<span className='span'>Honors program : </span> <br />
							They are material and in-kind benefits for the orphans who are not sponsored by it, so they console them in their
							difficult circumstances, motivate them in their education, and help them in their lives.
						</p>
					</div>
				</div>

				<div className='depabout3'>
					<div className=' content-imgs '>
						<Image src={output} alt='pages' />
					</div>
					<div className='content-texts'>
						<h1> The most prominent outputs of Dar Al-Fajr </h1>
						<p>
							<span className='span'>Accommodation Program : </span> <br />
							<ul>
								<li>Improving the standard of living of hundreds of families at the level of Hadramout governorate.</li>
								<li>
									Rehabilitating hundreds of orphans professionally and professionally and launching them into the labor market.
								</li>
								<li>
									Rehabilitation of hundreds of orphans developmentally and intellectually through the establishment of many
									rehabilitation programs.
								</li>
								<li>Improving the educational level of hundreds of orphans with a low educational level.</li>
								<li>
									Rehabilitating hundreds of mothers of orphans professionally through the establishment of vocational and craft
									programs, and providing material and moral support for their own projects
								</li>
							</ul>
						</p>
					</div>
				</div>

				<div className='depabout2'>
					<div className=' content-imgs '>
						<Image width={200} src={house} alt='' />
					</div>
					<div className='content-texts'>
						<h1> House facilities and components </h1>
						<p>
							<span className='span'>The house is divided into three modern bulildings containing </span> <br />
							<ul>
								<li>The number of (62) rooms that can accommodate (300) orphans.</li>
								<li>The administration building, the dining hall and its annexes.</li>
								<li>A mosque, classrooms and a health unit.</li>
								<li>A computer room and a hall for training, rehabilitation and events.</li>
								<li>A games room, a football field, and a volleyball court.</li>
							</ul>
						</p>
					</div>
				</div>
			</section>

			<Anchor target='services'></Anchor>
			<section className='services'>
				<h1 className='text-center'>Services</h1>
				<div className='box'>
					<div className='card1'>
						<Image src={socials} alt='' />
						<h5>Social services</h5>
						<div className='par'>
							<p>
								It include many of the projects that it presented in this aspect, such as cash guarantees, food basket
								distribution,and the distribution of clothes and shoes
							</p>
						</div>
					</div>

					<div className='card2'>
						<Image src={Education} alt='' />
						<h5>Education Services</h5>
						<div className='par'>
							<p>
								This aspect includes some methodes that help in the success of educational process, such as distributing the bag
								and school uniforms, educational sponsorship, holding courses and remedial lessons
							</p>
						</div>
					</div>
					<div className='card3'>
						<Image src={helgh} alt='' />
						<h5>Health Services</h5>
						<div className='par'>
							<p>
								On the health side, it also contributed to several operations, such as ensuring surgical operations, such as
								ensuring surgical operations,taking care of treatments and medications, and periodic medical examination
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* <a name='skills'></a>

			<a name='content'></a> */}
			{/* <footer className='footer'>
				<div className='content-footer'>
					<h2>Contact</h2>
					<p> Yemen / Hadramout / Mukalla / Fuwa - Al Masaken / behind Fuwa Educational Complex for Girls </p>

					<a className='a' href='tel:00967777543654'>
						{' '}
						<h3>00967 - 777 543 654</h3>{' '}
					</a>
					<a className='a' href='tel:00967772730370'>
						{' '}
						<h3>00967 - 772 730 370</h3>{' '}
					</a>

					<h2></h2>
				</div>
			</footer> */}
		</div>
	);
}
