/* AI Family Room — app shell + Tweaks */
const { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSlider } = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "layout": "Hub",
  "heroLayout": "Editorial",
  "liveBand": "Light",
  "rhythm": "Airy",
  "typeScale": 1
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [preload, setPreload] = React.useState(true);
  React.useEffect(() => {
    const id = setTimeout(() => setPreload(false), 60);
    return () => clearTimeout(id);
  }, []);
  const hub = t.layout !== 'Long scroll';
  const split = t.heroLayout === 'Split';
  const skTone = t.liveBand === 'Dark' ? 'dark' : 'light';
  const alt = t.rhythm === 'Alternating';

  // background map per rhythm preset (true = off-white), used by the long-scroll layout
  const bg = alt
    ? { chief: false, tracks: true, artifacts: false, tools: true, leaders: false, faq: true, pass: false }
    : { chief: true, tracks: false, artifacts: false, tools: true, leaders: false, faq: true, pass: false };

  return (
    <div className={preload ? 'afr-preload' : ''} style={{ '--afr-scale': t.typeScale }}>
      <window.Nav />
      {hub ? (
        <main>
          <window.Hero layout={split ? 'split' : 'editorial'} pills />
          <window.Bento bg={false} />
          <window.SideKick tone={skTone} />
          <window.Closing bg={true} />
        </main>
      ) : (
        <main>
          <window.Hero layout={split ? 'split' : 'editorial'} />
          <window.ChiefNote bg={bg.chief} />
          <window.Tracks bg={bg.tracks} />
          <window.Artifacts bg={bg.artifacts} />
          <window.Tools bg={bg.tools} />
          <window.SideKick tone={skTone} />
          <window.Leaders bg={bg.leaders} />
          <window.Faq bg={bg.faq} />
          <window.PassAlong bg={bg.pass} />
        </main>
      )}
      <window.SiteFooter />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Layout" />
        <TweakRadio label="Page layout" value={t.layout}
          options={['Hub', 'Long scroll']}
          onChange={(v) => setTweak('layout', v)} />
        <TweakSection label="Homepage direction" />
        <TweakRadio label="Hero layout" value={t.heroLayout}
          options={['Editorial', 'Split']}
          onChange={(v) => setTweak('heroLayout', v)} />
        <TweakRadio label="Live-class band" value={t.liveBand}
          options={['Light', 'Dark']}
          onChange={(v) => setTweak('liveBand', v)} />
        <TweakRadio label="Section rhythm" value={t.rhythm}
          options={['Airy', 'Alternating']}
          onChange={(v) => setTweak('rhythm', v)} />
        <TweakSection label="Type" />
        <TweakSlider label="Type scale" value={t.typeScale} min={0.9} max={1.15} step={0.01}
          onChange={(v) => setTweak('typeScale', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
