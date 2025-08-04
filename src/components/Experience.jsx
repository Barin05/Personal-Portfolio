import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';

import 'react-vertical-timeline-component/style.min.css';
import { experiences } from '../constants'; // adjust the path if your experiences array lives elsewhere
import PropTypes from 'prop-types';
import { ThemeToggle } from './ThemeToggle';

const ExperienceCard = ({ experience }) => {
    if (!experience) return null;
    const {
        date = '',
        iconBg = '#000',
        icon = '',
        company_name = '',
        title = '',
        points = [],
    } = experience;

    return (
        <VerticalTimelineElement
            contentStyle={{ background: "hsl(var(--card))", color: "hsl(var(--foreground))" }}
            contentArrowStyle={{ borderRight: "7px solid hsl(var(--card))" }}
            date={date}
            iconStyle={{ background: iconBg }}
            icon={
                <div className="flex justify-center items-center w-full h-full">
                    <img
                        src={icon}
                        alt={company_name}
                        className="w-[60%] h-[60%] object-contain"
                    />
                </div>
            }
        >
            <div>
                <h3 className="text-secondary-foreground text-[24px] font-bold">{title}</h3>
                <p className="text-secondary-foreground text-[16px] font-semibold opacity-60">{company_name}</p>
                {Array.isArray(points) && points.length > 0 && (
                    <ul className="mt-5 list-disc ml-5 space-y-2">
                        {points.map((point, index) => (
                            <li key={`experience-point-${index}`}
                                className="text-muted-foreground text-[14px] pl-1 tracking-wider"
                            >{point}</li>
                        ))}
                    </ul>
                )}
            </div>
        </VerticalTimelineElement>
    );
};

ExperienceCard.propTypes = {
    experience: PropTypes.shape({
        date: PropTypes.string,
        iconBg: PropTypes.string,
        icon: PropTypes.string,
        company_name: PropTypes.string,
        title: PropTypes.string,
        points: PropTypes.arrayOf(PropTypes.string),
    }),
};

export const Experience = () => {
    if (!Array.isArray(experiences)) {
        console.error('experiences is not an array', experiences);
        return <div className="mt-20">No experience data available.</div>;
    }
    return (
        <section id="experience" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl"> 
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    Work <span className="text-primary">Experience</span>
                </h2>
                <div className="mt-20 flex flex-col">
                    <VerticalTimeline lineColor="hsl(var(--foreground))">
                        {experiences.map((experience, index) => (
                            <ExperienceCard
                                key={`experience-${index}`}
                                experience={experience}
                            />
                        ))}
                    </VerticalTimeline>
                </div>
            </div>
        </section>
    );
};