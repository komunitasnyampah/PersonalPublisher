import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  CreditCard, User, FileText, Building, Key, 
  Plus, Edit, Trash2, Copy, Eye, EyeOff,
  Shield, Lock, ExternalLink, Download
} from "lucide-react";

interface IDDocument {
  id: string;
  title: string;
  type: 'ktp' | 'passport' | 'sim' | 'npwp' | 'bpjs' | 'bank' | 'other';
  number: string;
  issuedBy: string;
  issuedDate: string;
  expiryDate?: string;
  notes?: string;
  links: string[];
  isVisible: boolean;
  importance: 'high' | 'medium' | 'low';
}

const ID_TYPES = {
  ktp: { label: 'KTP', icon: User, color: 'bg-blue-100 text-blue-800' },
  passport: { label: 'Paspor', icon: FileText, color: 'bg-green-100 text-green-800' },
  sim: { label: 'SIM', icon: CreditCard, color: 'bg-yellow-100 text-yellow-800' },
  npwp: { label: 'NPWP', icon: Building, color: 'bg-purple-100 text-purple-800' },
  bpjs: { label: 'BPJS', icon: Shield, color: 'bg-red-100 text-red-800' },
  bank: { label: 'Bank Account', icon: CreditCard, color: 'bg-gray-100 text-gray-800' },
  other: { label: 'Lainnya', icon: Key, color: 'bg-indigo-100 text-indigo-800' }
};

export function IDManager() {
  const [documents, setDocuments] = useState<IDDocument[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  
  const [formData, setFormData] = useState({
    title: '',
    type: 'ktp' as IDDocument['type'],
    number: '',
    issuedBy: '',
    issuedDate: '',
    expiryDate: '',
    notes: '',
    links: [''],
    importance: 'medium' as IDDocument['importance']
  });

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = () => {
    const saved = localStorage.getItem('important_documents');
    if (saved) {
      setDocuments(JSON.parse(saved));
    } else {
      // Load sample data
      const sampleDocs: IDDocument[] = [
        {
          id: '1',
          title: 'Kartu Tanda Penduduk',
          type: 'ktp',
          number: '3171************',
          issuedBy: 'Disdukcapil Jakarta Pusat',
          issuedDate: '2020-01-15',
          notes: 'KTP elektronik berlaku seumur hidup',
          links: ['https://dukcapil.kemendagri.go.id'],
          isVisible: false,
          importance: 'high'
        },
        {
          id: '2',
          title: 'NPWP Pribadi',
          type: 'npwp',
          number: '12.345.678.9-123.000',
          issuedBy: 'Kantor Pajak Jakarta Pusat',
          issuedDate: '2019-03-20',
          notes: 'Untuk keperluan pajak dan administrasi',
          links: ['https://djp.kemenkeu.go.id', 'https://oss.go.id'],
          isVisible: false,
          importance: 'high'
        }
      ];
      setDocuments(sampleDocs);
      saveDocuments(sampleDocs);
    }
  };

  const saveDocuments = (docs: IDDocument[]) => {
    localStorage.setItem('important_documents', JSON.stringify(docs));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newDoc: IDDocument = {
      id: editingId || Date.now().toString(),
      ...formData,
      links: formData.links.filter(link => link.trim() !== ''),
      isVisible: false
    };

    let updatedDocs;
    if (editingId) {
      updatedDocs = documents.map(doc => doc.id === editingId ? newDoc : doc);
    } else {
      updatedDocs = [...documents, newDoc];
    }

    setDocuments(updatedDocs);
    saveDocuments(updatedDocs);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      type: 'ktp',
      number: '',
      issuedBy: '',
      issuedDate: '',
      expiryDate: '',
      notes: '',
      links: [''],
      importance: 'medium'
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const editDocument = (doc: IDDocument) => {
    setFormData({
      title: doc.title,
      type: doc.type,
      number: doc.number,
      issuedBy: doc.issuedBy,
      issuedDate: doc.issuedDate,
      expiryDate: doc.expiryDate || '',
      notes: doc.notes || '',
      links: doc.links.length > 0 ? doc.links : [''],
      importance: doc.importance
    });
    setEditingId(doc.id);
    setIsAdding(true);
  };

  const deleteDocument = (id: string) => {
    if (confirm('Yakin ingin menghapus dokumen ini?')) {
      const updatedDocs = documents.filter(doc => doc.id !== id);
      setDocuments(updatedDocs);
      saveDocuments(updatedDocs);
    }
  };

  const toggleVisibility = (id: string) => {
    const updatedDocs = documents.map(doc => 
      doc.id === id ? { ...doc, isVisible: !doc.isVisible } : doc
    );
    setDocuments(updatedDocs);
    saveDocuments(updatedDocs);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show notification if available
    if ((window as any).showNotif) {
      (window as any).showNotif('Berhasil dicopy ke clipboard!', 'success');
    }
  };

  const exportDocuments = () => {
    const dataStr = JSON.stringify(documents, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'important_documents.json';
    link.click();
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.issuedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    return matchesSearch && matchesType;
  });

  const addLinkField = () => {
    setFormData({
      ...formData,
      links: [...formData.links, '']
    });
  };

  const updateLink = (index: number, value: string) => {
    const newLinks = [...formData.links];
    newLinks[index] = value;
    setFormData({ ...formData, links: newLinks });
  };

  const removeLink = (index: number) => {
    const newLinks = formData.links.filter((_, i) => i !== index);
    setFormData({ ...formData, links: newLinks });
  };

  return (
    <div className="space-y-6" id="id-manager">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manajemen ID Penting</h2>
          <p className="text-gray-600">Kelola dokumen dan ID penting dengan aman</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportDocuments} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button onClick={() => setIsAdding(true)} id="add-document-btn">
            <Plus className="h-4 w-4 mr-1" />
            Tambah Dokumen
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Cari dokumen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Semua Tipe</option>
          {Object.entries(ID_TYPES).map(([key, type]) => (
            <option key={key} value={key}>{type.label}</option>
          ))}
        </select>
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle>{editingId ? 'Edit' : 'Tambah'} Dokumen</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Nama Dokumen</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Tipe Dokumen</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as IDDocument['type'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.entries(ID_TYPES).map(([key, type]) => (
                      <option key={key} value={key}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="number">Nomor Dokumen</Label>
                  <Input
                    id="number"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="issuedBy">Dikeluarkan Oleh</Label>
                  <Input
                    id="issuedBy"
                    value={formData.issuedBy}
                    onChange={(e) => setFormData({ ...formData, issuedBy: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="issuedDate">Tanggal Dikeluarkan</Label>
                  <Input
                    id="issuedDate"
                    type="date"
                    value={formData.issuedDate}
                    onChange={(e) => setFormData({ ...formData, issuedDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="expiryDate">Tanggal Kadaluarsa (Opsional)</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="importance">Tingkat Kepentingan</Label>
                  <select
                    id="importance"
                    value={formData.importance}
                    onChange={(e) => setFormData({ ...formData, importance: e.target.value as IDDocument['importance'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="high">Tinggi</option>
                    <option value="medium">Sedang</option>
                    <option value="low">Rendah</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Catatan</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Catatan tambahan tentang dokumen ini..."
                />
              </div>

              {/* Links Section */}
              <div>
                <Label>Tautan Terkait</Label>
                {formData.links.map((link, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <Input
                      value={link}
                      onChange={(e) => updateLink(index, e.target.value)}
                      placeholder="https://..."
                      className="flex-1"
                    />
                    {formData.links.length > 1 && (
                      <Button type="button" onClick={() => removeLink(index)} variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" onClick={addLinkField} variant="outline" size="sm" className="mt-2">
                  <Plus className="h-4 w-4 mr-1" />
                  Tambah Link
                </Button>
              </div>

              <div className="flex gap-2">
                <Button type="submit">
                  {editingId ? 'Update' : 'Simpan'} Dokumen
                </Button>
                <Button type="button" onClick={resetForm} variant="outline">
                  Batal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Documents List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((doc) => {
          const TypeIcon = ID_TYPES[doc.type].icon;
          const isExpired = doc.expiryDate && new Date(doc.expiryDate) < new Date();
          
          return (
            <Card key={doc.id} className={`relative ${isExpired ? 'border-red-300' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <TypeIcon className="h-5 w-5 text-gray-600" />
                    <div>
                      <CardTitle className="text-base">{doc.title}</CardTitle>
                      <Badge className={ID_TYPES[doc.type].color} variant="secondary">
                        {ID_TYPES[doc.type].label}
                      </Badge>
                    </div>
                  </div>
                  <Badge 
                    variant={doc.importance === 'high' ? 'destructive' : doc.importance === 'medium' ? 'default' : 'secondary'}
                  >
                    {doc.importance === 'high' ? 'Tinggi' : doc.importance === 'medium' ? 'Sedang' : 'Rendah'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-500">Nomor Dokumen</Label>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">
                      {doc.isVisible ? doc.number : '••••••••••••••••'}
                    </span>
                    <Button
                      onClick={() => toggleVisibility(doc.id)}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                    >
                      {doc.isVisible ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </Button>
                    {doc.isVisible && (
                      <Button
                        onClick={() => copyToClipboard(doc.number)}
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-gray-500">Dikeluarkan Oleh</Label>
                  <p className="text-sm">{doc.issuedBy}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <Label className="text-gray-500">Dikeluarkan</Label>
                    <p>{new Date(doc.issuedDate).toLocaleDateString('id-ID')}</p>
                  </div>
                  {doc.expiryDate && (
                    <div>
                      <Label className={`${isExpired ? 'text-red-500' : 'text-gray-500'}`}>
                        {isExpired ? 'Expired' : 'Kadaluarsa'}
                      </Label>
                      <p className={isExpired ? 'text-red-500 font-medium' : ''}>
                        {new Date(doc.expiryDate).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  )}
                </div>

                {doc.notes && (
                  <div>
                    <Label className="text-xs text-gray-500">Catatan</Label>
                    <p className="text-sm text-gray-700">{doc.notes}</p>
                  </div>
                )}

                {doc.links.length > 0 && (
                  <div>
                    <Label className="text-xs text-gray-500">Tautan Terkait</Label>
                    <div className="space-y-1">
                      {doc.links.map((link, index) => (
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
                        >
                          <ExternalLink className="h-3 w-3" />
                          {new URL(link).hostname}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-2 border-t">
                  <Button onClick={() => editDocument(doc)} variant="outline" size="sm" className="flex-1">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button onClick={() => deleteDocument(doc.id)} variant="outline" size="sm" className="flex-1">
                    <Trash2 className="h-3 w-3 mr-1" />
                    Hapus
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <Key className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada dokumen</h3>
          <p className="text-gray-600 mb-4">Mulai tambahkan dokumen penting Anda</p>
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Tambah Dokumen Pertama
          </Button>
        </div>
      )}
    </div>
  );
}