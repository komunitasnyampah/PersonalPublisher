import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, Download, Copy, Eye, Edit, Trash2, 
  Plus, Mail, Building, User, Calendar, 
  Briefcase, GraduationCap, Award, Shield
} from "lucide-react";

interface LetterTemplate {
  id: string;
  name: string;
  type: 'cover_letter' | 'resignation' | 'recommendation' | 'permission' | 'complaint' | 'application' | 'other';
  category: 'work' | 'education' | 'personal' | 'official';
  template: string;
  variables: string[];
  description: string;
}

interface SavedLetter {
  id: string;
  templateId: string;
  title: string;
  content: string;
  variables: Record<string, string>;
  createdAt: string;
  lastModified: string;
}

const LETTER_TEMPLATES: LetterTemplate[] = [
  {
    id: 'cover_letter',
    name: 'Surat Lamaran Kerja',
    type: 'cover_letter',
    category: 'work',
    description: 'Template surat lamaran kerja profesional',
    variables: ['nama_lengkap', 'alamat', 'nomor_telepon', 'email', 'posisi', 'nama_perusahaan', 'alamat_perusahaan', 'nama_hrd', 'tanggal'],
    template: `{tanggal}

Kepada Yth.
{nama_hrd}
HRD {nama_perusahaan}
{alamat_perusahaan}

Dengan hormat,

Saya yang bertanda tangan di bawah ini:

Nama          : {nama_lengkap}
Alamat        : {alamat}
No. Telepon   : {nomor_telepon}
Email         : {email}

Dengan ini mengajukan permohonan untuk dapat bergabung di {nama_perusahaan} sebagai {posisi}.

Saya memiliki kualifikasi dan pengalaman yang sesuai dengan posisi yang Bapak/Ibu tawarkan. Saya yakin dapat memberikan kontribusi positif bagi kemajuan perusahaan.

Sebagai bahan pertimbangan, bersama ini saya lampirkan:
1. Daftar Riwayat Hidup
2. Fotokopi Ijazah dan Transkrip Nilai
3. Fotokopi KTP
4. Pas foto terbaru
5. Sertifikat kursus/pelatihan (jika ada)

Saya berharap dapat diberikan kesempatan untuk mengikuti tes dan wawancara sesuai dengan waktu yang Bapak/Ibu tentukan.

Demikian surat lamaran ini saya buat dengan sebenar-benarnya. Atas perhatian dan kesempatan yang diberikan, saya ucapkan terima kasih.

Hormat saya,


{nama_lengkap}`
  },
  {
    id: 'resignation',
    name: 'Surat Pengunduran Diri',
    type: 'resignation',
    category: 'work',
    description: 'Template surat pengunduran diri dari pekerjaan',
    variables: ['nama_lengkap', 'jabatan', 'nama_atasan', 'nama_perusahaan', 'tanggal_efektif', 'alasan', 'tanggal'],
    template: `{tanggal}

Kepada Yth.
{nama_atasan}
{nama_perusahaan}

Dengan hormat,

Yang bertanda tangan di bawah ini:

Nama          : {nama_lengkap}
Jabatan       : {jabatan}

Dengan ini menyampaikan permohonan pengunduran diri dari posisi sebagai {jabatan} di {nama_perusahaan}, efektif mulai tanggal {tanggal_efektif}.

Alasan pengunduran diri ini adalah {alasan}.

Saya berkomitmen untuk menyelesaikan semua tugas dan tanggung jawab hingga masa kerja berakhir, serta akan membantu proses transisi sebaik mungkin.

Saya mengucapkan terima kasih atas kesempatan, pengalaman, dan pembelajaran yang telah diberikan selama bekerja di {nama_perusahaan}.

Demikian surat pengunduran diri ini saya sampaikan. Atas perhatian dan pengertiannya, saya ucapkan terima kasih.

Hormat saya,


{nama_lengkap}
{jabatan}`
  },
  {
    id: 'recommendation',
    name: 'Surat Rekomendasi',
    type: 'recommendation',
    category: 'work',
    description: 'Template surat rekomendasi untuk karyawan/mahasiswa',
    variables: ['nama_pemberi', 'jabatan_pemberi', 'institusi_pemberi', 'nama_penerima', 'jabatan_hubungan', 'periode_kerja', 'prestasi', 'karakter', 'tanggal'],
    template: `{tanggal}

SURAT REKOMENDASI

Yang bertanda tangan di bawah ini:

Nama          : {nama_pemberi}
Jabatan       : {jabatan_pemberi}
Institusi     : {institusi_pemberi}

Dengan ini memberikan rekomendasi untuk:

Nama          : {nama_penerima}
Hubungan      : {jabatan_hubungan}
Periode       : {periode_kerja}

Selama periode tersebut, yang bersangkutan menunjukkan:

1. Prestasi Kerja:
{prestasi}

2. Karakter dan Sikap:
{karakter}

Berdasarkan pengalaman bekerja sama, saya memberikan rekomendasi positif untuk yang bersangkutan dalam melanjutkan karir atau pendidikannya.

Demikian surat rekomendasi ini dibuat dengan sebenar-benarnya dan dapat dipergunakan sebagaimana mestinya.

Hormat saya,


{nama_pemberi}
{jabatan_pemberi}
{institusi_pemberi}`
  },
  {
    id: 'permission',
    name: 'Surat Izin',
    type: 'permission',
    category: 'personal',
    description: 'Template surat izin untuk berbagai keperluan',
    variables: ['nama_lengkap', 'alamat', 'keperluan', 'tanggal_mulai', 'tanggal_selesai', 'nama_penerima', 'jabatan_penerima', 'institusi', 'tanggal'],
    template: `{tanggal}

Kepada Yth.
{nama_penerima}
{jabatan_penerima}
{institusi}

Dengan hormat,

Yang bertanda tangan di bawah ini:

Nama          : {nama_lengkap}
Alamat        : {alamat}

Dengan ini memohon izin untuk {keperluan} pada:

Tanggal       : {tanggal_mulai} s/d {tanggal_selesai}

Sehubungan dengan hal tersebut, saya berharap dapat diberikan izin sesuai dengan permohonan ini.

Demikian surat izin ini saya buat. Atas perhatian dan pengertiannya, saya ucapkan terima kasih.

Hormat saya,


{nama_lengkap}`
  },
  {
    id: 'complaint',
    name: 'Surat Pengaduan',
    type: 'complaint',
    category: 'official',
    description: 'Template surat pengaduan resmi',
    variables: ['nama_lengkap', 'alamat', 'nomor_telepon', 'subjek_pengaduan', 'kronologi', 'permintaan', 'nama_penerima', 'jabatan_penerima', 'institusi', 'tanggal'],
    template: `{tanggal}

Kepada Yth.
{nama_penerima}
{jabatan_penerima}
{institusi}

Dengan hormat,

Yang bertanda tangan di bawah ini:

Nama          : {nama_lengkap}
Alamat        : {alamat}
No. Telepon   : {nomor_telepon}

Dengan ini menyampaikan pengaduan mengenai: {subjek_pengaduan}

Kronologi kejadian:
{kronologi}

Sehubungan dengan hal tersebut, saya memohon kepada Bapak/Ibu untuk:
{permintaan}

Sebagai lampiran, saya sertakan dokumen-dokumen pendukung yang diperlukan.

Demikian surat pengaduan ini saya sampaikan. Atas perhatian dan tindak lanjutnya, saya ucapkan terima kasih.

Hormat saya,


{nama_lengkap}`
  },
  {
    id: 'application',
    name: 'Surat Permohonan',
    type: 'application',
    category: 'official',
    description: 'Template surat permohonan umum',
    variables: ['nama_lengkap', 'alamat', 'nomor_telepon', 'permohonan', 'alasan', 'nama_penerima', 'jabatan_penerima', 'institusi', 'tanggal'],
    template: `{tanggal}

Kepada Yth.
{nama_penerima}
{jabatan_penerima}
{institusi}

Dengan hormat,

Yang bertanda tangan di bawah ini:

Nama          : {nama_lengkap}
Alamat        : {alamat}
No. Telepon   : {nomor_telepon}

Dengan ini mengajukan permohonan untuk: {permohonan}

Adapun alasan permohonan ini adalah: {alasan}

Sebagai bahan pertimbangan, bersama ini saya lampirkan dokumen-dokumen yang diperlukan.

Demikian surat permohonan ini saya sampaikan. Atas perhatian dan perkenannya, saya ucapkan terima kasih.

Hormat saya,


{nama_lengkap}`
  }
];

const CATEGORY_ICONS = {
  work: Briefcase,
  education: GraduationCap,
  personal: User,
  official: Building
};

const TYPE_COLORS = {
  cover_letter: 'bg-blue-100 text-blue-800',
  resignation: 'bg-red-100 text-red-800',
  recommendation: 'bg-green-100 text-green-800',
  permission: 'bg-yellow-100 text-yellow-800',
  complaint: 'bg-orange-100 text-orange-800',
  application: 'bg-purple-100 text-purple-800',
  other: 'bg-gray-100 text-gray-800'
};

export function LetterGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<LetterTemplate | null>(null);
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [generatedContent, setGeneratedContent] = useState('');
  const [savedLetters, setSavedLetters] = useState<SavedLetter[]>([]);
  const [letterTitle, setLetterTitle] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadSavedLetters();
  }, []);

  useEffect(() => {
    if (selectedTemplate) {
      generateLetter();
    }
  }, [variables, selectedTemplate]);

  const loadSavedLetters = () => {
    const saved = localStorage.getItem('saved_letters');
    if (saved) {
      setSavedLetters(JSON.parse(saved));
    }
  };

  const saveLetter = () => {
    if (!letterTitle.trim() || !generatedContent.trim()) {
      alert('Mohon isi judul surat dan pastikan konten telah digenerate');
      return;
    }

    const newLetter: SavedLetter = {
      id: Date.now().toString(),
      templateId: selectedTemplate?.id || '',
      title: letterTitle,
      content: generatedContent,
      variables: { ...variables },
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    const updated = [...savedLetters, newLetter];
    setSavedLetters(updated);
    localStorage.setItem('saved_letters', JSON.stringify(updated));
    
    if ((window as any).showNotif) {
      (window as any).showNotif('Surat berhasil disimpan!', 'success');
    }
    
    setLetterTitle('');
  };

  const deleteLetter = (id: string) => {
    if (confirm('Yakin ingin menghapus surat ini?')) {
      const updated = savedLetters.filter(letter => letter.id !== id);
      setSavedLetters(updated);
      localStorage.setItem('saved_letters', JSON.stringify(updated));
    }
  };

  const loadLetter = (letter: SavedLetter) => {
    const template = LETTER_TEMPLATES.find(t => t.id === letter.templateId);
    if (template) {
      setSelectedTemplate(template);
      setVariables(letter.variables);
      setGeneratedContent(letter.content);
      setLetterTitle(letter.title);
    }
  };

  const generateLetter = () => {
    if (!selectedTemplate) return;

    let content = selectedTemplate.template;
    
    // Replace variables in template
    selectedTemplate.variables.forEach(variable => {
      const value = variables[variable] || `[${variable}]`;
      const regex = new RegExp(`{${variable}}`, 'g');
      content = content.replace(regex, value);
    });

    setGeneratedContent(content);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    if ((window as any).showNotif) {
      (window as any).showNotif('Surat berhasil dicopy ke clipboard!', 'success');
    }
  };

  const downloadAsText = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${letterTitle || 'surat'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const printLetter = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${letterTitle || 'Surat'}</title>
            <style>
              body { 
                font-family: 'Times New Roman', serif; 
                font-size: 12pt; 
                line-height: 1.6; 
                margin: 2cm;
                white-space: pre-line;
              }
              @media print {
                body { margin: 1cm; }
              }
            </style>
          </head>
          <body>
            ${generatedContent.replace(/\n/g, '<br>')}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const filteredTemplates = LETTER_TEMPLATES.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6" id="letter-generator">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Generator Surat Penting</h2>
        <p className="text-gray-600">Buat surat-surat resmi dengan template profesional</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template Selection */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">Pilih Template</h3>
            
            {/* Search and Filter */}
            <div className="space-y-2 mb-4">
              <Input
                placeholder="Cari template..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Semua Kategori</option>
                <option value="work">Pekerjaan</option>
                <option value="education">Pendidikan</option>
                <option value="personal">Personal</option>
                <option value="official">Resmi</option>
              </select>
            </div>

            {/* Template Cards */}
            <div className="space-y-2">
              {filteredTemplates.map((template) => {
                const CategoryIcon = CATEGORY_ICONS[template.category];
                return (
                  <Card 
                    key={template.id} 
                    className={`cursor-pointer transition-colors ${
                      selectedTemplate?.id === template.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-2">
                        <CategoryIcon className="h-4 w-4 text-gray-600 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{template.name}</h4>
                          <p className="text-xs text-gray-600 mb-2">{template.description}</p>
                          <Badge className={TYPE_COLORS[template.type]} variant="secondary">
                            {template.category}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Saved Letters */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Surat Tersimpan</h3>
            <div className="space-y-2">
              {savedLetters.map((letter) => (
                <Card key={letter.id} className="cursor-pointer hover:bg-gray-50">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1" onClick={() => loadLetter(letter)}>
                        <h4 className="font-medium text-sm">{letter.title}</h4>
                        <p className="text-xs text-gray-600">
                          {new Date(letter.createdAt).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                      <Button
                        onClick={() => deleteLetter(letter.id)}
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {savedLetters.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  Belum ada surat tersimpan
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Form Variables */}
        {selectedTemplate && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Isi Data Surat</h3>
            <Card>
              <CardContent className="p-4 space-y-4">
                {selectedTemplate.variables.map((variable) => (
                  <div key={variable}>
                    <Label htmlFor={variable}>
                      {variable.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Label>
                    {variable.includes('alamat') || variable.includes('kronologi') || variable.includes('alasan') || variable.includes('prestasi') || variable.includes('karakter') || variable.includes('permintaan') ? (
                      <Textarea
                        id={variable}
                        value={variables[variable] || ''}
                        onChange={(e) => setVariables({ ...variables, [variable]: e.target.value })}
                        placeholder={`Masukkan ${variable.replace(/_/g, ' ')}`}
                      />
                    ) : variable.includes('tanggal') ? (
                      <Input
                        id={variable}
                        type="date"
                        value={variables[variable] || ''}
                        onChange={(e) => setVariables({ ...variables, [variable]: e.target.value })}
                      />
                    ) : (
                      <Input
                        id={variable}
                        value={variables[variable] || ''}
                        onChange={(e) => setVariables({ ...variables, [variable]: e.target.value })}
                        placeholder={`Masukkan ${variable.replace(/_/g, ' ')}`}
                      />
                    )}
                  </div>
                ))}

                <div className="pt-4 border-t">
                  <Label htmlFor="letterTitle">Judul Surat (untuk penyimpanan)</Label>
                  <Input
                    id="letterTitle"
                    value={letterTitle}
                    onChange={(e) => setLetterTitle(e.target.value)}
                    placeholder="Contoh: Lamaran Kerja PT XYZ"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={saveLetter} className="flex-1">
                    <Plus className="h-4 w-4 mr-1" />
                    Simpan
                  </Button>
                  <Button onClick={() => setIsPreviewMode(!isPreviewMode)} variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Preview/Result */}
        {selectedTemplate && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Hasil Surat</h3>
              <div className="flex gap-2">
                <Button onClick={copyToClipboard} variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <Button onClick={downloadAsText} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button onClick={printLetter} variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-1" />
                  Print
                </Button>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div 
                  className="min-h-[400px] font-mono text-sm whitespace-pre-line border rounded p-4 bg-white"
                  style={{ fontFamily: 'Times New Roman, serif' }}
                >
                  {generatedContent || 'Isi data pada form untuk melihat hasil surat...'}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Welcome State */}
      {!selectedTemplate && (
        <div className="text-center py-12">
          <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Pilih Template Surat</h3>
          <p className="text-gray-600 mb-4">
            Pilih template dari daftar di sebelah kiri untuk mulai membuat surat
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-md mx-auto">
            {Object.entries(CATEGORY_ICONS).map(([key, Icon]) => (
              <div key={key} className="text-center">
                <Icon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 capitalize">{key}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}