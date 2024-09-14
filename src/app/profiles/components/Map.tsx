'use client';

interface MapComponentProps {
    center: { lat: number, lng: number };
}

const MapComponent: React.FC<MapComponentProps> = ({ center }) => {
    const mapSrc = `https://maps.google.com/maps?q=${center.lat},${center.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    return (
        <div style={{
            width: '100%',
            height: '400px',
            borderRadius: '20px',
            overflow: 'hidden'
        }}>
            <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: '0' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    );
};

export { MapComponent };
