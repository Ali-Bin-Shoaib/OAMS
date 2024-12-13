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
			{/* الكود الخاص بالتسجيل / تسجيل الدخول مخفي حالياً
			{!session && (
				<nav className='nav'>
					<div className='title'>
						<Image className='icon' src={img1} alt='logo' />
						<h2 className='title-home'>
							دار <span>الفجر</span>
						</h2>
					</div>
					<ul className='pages' id='action'>
						<li className='l-pages'>
							<a href='#home' className='a'>
								الصفحة الرئيسية
							</a>
						</li>
						<li className='l-pages'>
							<a href='#about' className='a'>
								من نحن
							</a>
						</li>
						<li className='l-pages'>
							<a href='#services' className='a'>
								خدماتنا
							</a>
						</li>
						<li className='l-pages'>
							<a href='#content' className='a'>
								تواصل معنا
							</a>
						</li>
					</ul>
					{!session && (
						<Tooltip label='تسجيل الدخول'>
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
						<h1>دار الفجر</h1>
						<h4>
							لرعاية وتأهيل <span>الأيتام</span>
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
							<h2> الأيتام المكفولون </h2>
							<h5>42</h5>
						</div>
						<div className='imgspon'>
							<Image width={70} src={withoutsponsor} alt='' />
							<h2> الأيتام غير المكفولين </h2>
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
						<h1> من نحن </h1>
						<p>
							تعتبر هذه الدار مشروعاً حيوياً هاماً، وهي من المشاريع الاجتماعية الرائدة على مستوى محافظة حضرموت في كفالة الأيتام وتربيتهم ورعايتهم وتأهيلهم منذ عام 2009.
						</p>
						<p>
							<span className='span'>الموقع : </span>
							الجمهورية اليمنية / حضرموت / المكلا / فوة - المساكن / خلف المجمع التربوي للبنات
						</p>
						<p>
							<span className='span'>الجهة المشرفة : </span>
							مكتب وزارة الشؤون الاجتماعية والعمل بساحل حضرموت، بالشراكة مع مؤسسة الفجر الخيرية الاجتماعية
						</p>
						<p>
							<span className='span'>رؤيتنا : </span>
							رعاية متميزة في الخدمات الاجتماعية والنفسية والتنموية تهدف إلى تأهيل اليتيم وتنمية قدراته ليحيا حياة كريمة
						</p>
						<p>
							<span className='span'>رسالتنا : </span>
							الريادة في رعاية وتأهيل الأيتام من خلال كفاءات متميزة وبرامج شاملة
						</p>
					</div>
				</div>

				<div className='depabout2'>
					<div className=' content-imgs '>
						<Image src={offer} alt='' />
					</div>
					<div className='content-texts'>
						<h1> ما تقدمه الدار للأيتام </h1>

						<p>
							<span className='span'>برنامج الإيواء : </span> <br />
							يوفر هذا البرنامج للأيتام المقيمين في الدار رعاية اجتماعية شاملة تشمل الإعاشة والإيواء والكسوة والتغذية والرعاية التعليمية والصحية ورعاية تربوية متكاملة، بالإضافة إلى الدورات التأهيلية والتنموية والمهنية والحرفية والأنشطة الترفيهية الهادفة.
						</p>
						<p>
							<span className='span'>برنامج الكفالة : </span> <br />
							يوفر هذا البرنامج مساعدات نقدية شهرية ومساعدات عينية للأيتام الذين يقيمون خارج الدار مع عائلاتهم، ويقيم برامج وأنشطة تعليمية وتأهيلية وترفيهية، وكذلك دورات تنموية ومهنية وحرفية.
						</p>
						<p>
							<span className='span'>برنامج التشريفات : </span> <br />
							هي فوائد مادية وعينية للأيتام غير المكفولين، تواسيهم في ظروفهم الصعبة، تحفزهم في تعليمهم، وتساعدهم في حياتهم.
						</p>
					</div>
				</div>

				<div className='depabout3'>
					<div className=' content-imgs '>
						<Image src={output} alt='pages' />
					</div>
					<div className='content-texts'>
						<h1> أبرز مخرجات دار الفجر </h1>
						<p>
							<span className='span'>مخرجات الدار : </span> <br />
							<ul>
								<li>تحسين المستوى المعيشي لمئات الأسر في محافظة حضرموت.</li>
								<li>تأهيل مئات الأيتام مهنياً وحرفياً وإطلاقهم إلى سوق العمل.</li>
								<li>تأهيل مئات الأيتام تنموياً وفكرياً من خلال إقامة العديد من البرامج التأهيلية.</li>
								<li>تحسين المستوى التعليمي لمئات الأيتام ذوي المستوى التعليمي المنخفض.</li>
								<li>تأهيل مئات أمهات الأيتام مهنياً عبر إقامة برامج مهنية وحرفية، وتقديم الدعم المادي والمعنوي لمشاريعهن الخاصة.</li>
							</ul>
						</p>
					</div>
				</div>

				<div className='depabout2'>
					<div className=' content-imgs '>
						<Image width={200} src={house} alt='' />
					</div>
					<div className='content-texts'>
						<h1> مرافق الدار ومكوناتها </h1>
						<p>
							<span className='span'>تنقسم الدار إلى ثلاثة مبانٍ حديثة تحتوي على : </span> <br />
							<ul>
								<li>عدد (62) غرفة تستوعب (300) يتيم.</li>
								<li>مبنى الإدارة وصالة الطعام وملحقاتها.</li>
								<li>مسجد، وفصول دراسية، ووحدة صحية.</li>
								<li>غرفة حاسوب وقاعة للتدريب والتأهيل والفعاليات.</li>
								<li>غرفة ألعاب، وملعب كرة قدم، وملعب كرة طائرة.</li>
							</ul>
						</p>
					</div>
				</div>
			</section>

			<Anchor target='services'></Anchor>
			<section className='services'>
				<h1 className='text-center'>خدماتنا</h1>
				<div className='box'>
					<div className='card1'>
						<Image src={socials} alt='' />
						<h5>الخدمات الاجتماعية</h5>
						<div className='par'>
							<p>
								تشمل العديد من المشاريع التي قدمتها في هذا الجانب، مثل الكفالات النقدية، توزيع السلات الغذائية، وتوزيع الملابس والأحذية.
							</p>
						</div>
					</div>

					<div className='card2'>
						<Image src={Education} alt='' />
						<h5>الخدمات التعليمية</h5>
						<div className='par'>
							<p>
								يشمل هذا الجانب بعض الأساليب التي تساعد في نجاح العملية التعليمية، مثل توزيع الحقيبة والزي المدرسي، والكفالة التعليمية، وعقد الدورات والدروس التقوية.
							</p>
						</div>
					</div>
					<div className='card3'>
						<Image src={helgh} alt='' />
						<h5>الخدمات الصحية</h5>
						<div className='par'>
							<p>
								على الجانب الصحي، ساهمت الدار أيضاً في إجراء العديد من العمليات الجراحية، والعناية بالعلاجات والأدوية، والكشف الطبي الدوري.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/*  
			<footer className='footer'>
				<div className='content-footer'>
					<h2>تواصل معنا</h2>
					<p> اليمن / حضرموت / المكلا / فوة - المساكن / خلف المجمع التربوي للبنات </p>

					<a className='a' href='tel:00967777543654'>
						<h3>00967 - 777 543 654</h3>
					</a>
					<a className='a' href='tel:00967772730370'>
						<h3>00967 - 772 730 370</h3>
					</a>
				</div>
			</footer>
			*/}
		</div>
	);
}
