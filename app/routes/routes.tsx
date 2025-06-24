
// Main App Component with Routing
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<HomePage />} />
          
          {/* Products Routes */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/time-machine" element={<TimeMachinePage />} />
          <Route path="/products/luv" element={<LuvPage />} />
          <Route path="/products/elections-ontario" element={<ElectionsOntarioPage />} />
          <Route path="/products/camp-kazoo" element={<CampKazooPage />} />
          <Route path="/products/aquazette" element={<AquazettePage />} />
          <Route path="/products/morgane-et-ses-organes" element={<MorganeEtSesOrganesPage />} />
          <Route path="/products/the-self" element={<TheSelfPage />} />
          <Route path="/products/shiny-talking-people" element={<ShinyTalkingPeoplePage />} />
          <Route path="/products/exos" element={<ExosPage />} />
          <Route path="/products/invitame-a-la-playa" element={<InvitameALaPlayaPage />} />
          
          {/* Lab Route */}
          <Route path="/lab" element={<LabPage />} />
          
          {/* About Routes */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about/team" element={<TeamPage />} />
          
          {/* Individual Team Member Routes */}
          <Route path="/about/team/bea" element={<BeaProfilePage />} />
          <Route path="/about/team/ed" element={<EdProfilePage />} />
          
          {/* Contact Route */}
          <Route path="/contact" element={<ContactPage />} />
          
          {/* 404 Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
