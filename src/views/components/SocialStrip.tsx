import { IoStarOutline, IoCheckboxOutline, IoPhonePortraitOutline, IoCloudDoneOutline } from 'react-icons/io5'

export default function SocialStrip() {
  return (
    <div className="border-t border-b border-border py-5 px-6 flex items-center justify-center gap-8 flex-wrap">
      <div className="flex items-center gap-2.5 text-sm font-light text-content-secondary">
        <IoCloudDoneOutline size={18} className="text-brand-green" aria-hidden="true" />
        <strong className="font-heading text-lg font-semibold text-content-primary">
          100%
        </strong>
        offline-first
      </div>

      <div className="flex items-center gap-2.5 text-sm font-light text-content-secondary">
        <IoStarOutline size={18} className="text-brand-green" aria-hidden="true" />
        <strong className="font-heading text-lg font-semibold text-content-primary">
          Open Finance
        </strong>
        integrado
      </div>

      <div className="flex items-center gap-2.5 text-sm font-light text-content-secondary">
        <IoPhonePortraitOutline size={18} className="text-brand-green" aria-hidden="true" />
        <strong className="font-heading text-lg font-semibold text-content-primary">
          iOS
        </strong>
        &amp;
        <strong className="font-heading text-lg font-semibold text-content-primary">
          Android
        </strong>
      </div>

      <div className="flex items-center gap-2.5 text-sm font-light text-content-secondary">
        <IoCheckboxOutline size={18} className="text-brand-green" aria-hidden="true" />
        <strong className="font-heading text-lg font-semibold text-content-primary">
          LGPD
        </strong>
        compliant
      </div>
    </div>
  )
}
