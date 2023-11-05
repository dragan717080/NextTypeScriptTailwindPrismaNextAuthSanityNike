import { FC } from 'react';
import { socialsSvgPaths } from '@/config/svgPaths';
import { StringObject } from '@/app/interfaces/types';

const Footer: FC = () => {
  return (
    <footer className='white py-5'>
      {/* For small screens */}
      <div className='md:hidden px-3'>
        <div className='col-h space-y-4'>
          <div className="row space-x-4 text-gray-600 semibold">
            {['Privacy', 'Sitemap', 'Shipping', 'Abous Us']
              .map((item: string, index: number) => (
                <div className='hover:text-primary pointer' key={index}>{item}</div>
              ))}
          </div>
          <div className="row-h space-x-4">
            {Object.keys(socialsSvgPaths).map((socialIcon: keyof typeof socialsSvgPaths, index: number) => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className='h-6 w-6 fill-primary hover:fill-sky-500 transition transform duration-500 pointer hover:-mt-1'
                viewBox="0 0 24 24"
                key={index}
              >
                <path d={socialsSvgPaths[socialIcon]} />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <div className='hidden md:block'>
        <div className='px-7'>
          <div className='col-h space-y-4'>
            <div className="row space-x-4 text-gray-600 semibold">
              {['Privacy', 'Sitemap', 'Shipping', 'Terms of Use']
                .map((item: string, index: number) => (
                  <div className='hover:text-primary pointer' key={index}>{item}</div>
                ))}
            </div>
            <div className="row-h space-x-4">
              {Object.keys(socialsSvgPaths).map((socialIcon: keyof typeof socialsSvgPaths, index: number) => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className='h-6 w-6 fill-gray-600 hover:fill-sky-500 transition transform duration-500 pointer hover:-mt-1'
                  viewBox="0 0 24 24"
                  key={index}
                >
                  <path d={socialsSvgPaths[socialIcon]} />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
